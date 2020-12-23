import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import FARFormPDF from './FARFormPDF';

import { AssetForm, AssetFormRow } from "../types";
import { getNewReqNo, getCurrentDate } from '../helpers';

import Loader from "../components/Loader";
import Button from "../components/Button";
import Input from "../components/Input";
import DynamicTable from "../components/Table";
import { addForm, getLatestReqNo } from "../api";

interface Props {}

const ROW: AssetFormRow = {
  no: 1,
  budgetCode: "",
  quantity: 0,
  description: "",
  budgetedAmount: 0,
  location: "",
  assetPRID: "",
  assetCode: "",
};

const FARForm: React.FC<Props> = () => {
  const ERRORS = {preparedBy: "", approvedBy: "", division: ""};
  const [loading, setLoading] = useState<boolean | string>(false);
  const [rows, setRows] = useState<AssetFormRow[]>([{ ...ROW }]);
  const [editingRow, setEditingRow] = useState(0);
  
  const [reqNo, setReqNo] = useState("");
  const [division, setDivision] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState({...ERRORS});

  useEffect(() => {
        setLoading("Loading");
        (async () => { 
            const latestReq = await getLatestReqNo();
            if (latestReq.data) {
                const data: any = latestReq.data;
                setReqNo(getNewReqNo(data.reqNo));
                setLoading(false);
            } else {
                setLoading(false);
            }
        })();
  }, [])
  
  const handleChange = (name: string, index: number, value: any): void => {
    const tempRows = [...rows];
    switch (name) {
      case "no":
      case "quantity":
      case "budgetedAmount":
        tempRows[index][name] = +value;
        break;
      case "budgetCode":
      case "description":
      case "location":
      case "assetPRID":
      case "assetCode":
        tempRows[index][name] = value;
        break;
      default:
        console.log("Incorrect Field");
    }
    setRows(tempRows);
  };

  const addRow = () => {
    const newRow = { ...ROW };
    newRow.no = rows.length + 1;
    setRows([...rows, newRow]);
    setEditingRow(rows.length);
  };

  const saveAndDownload = async () => {
    setLoading("Saving");
    setErrors({ ...ERRORS });
    const newErrors = { ...ERRORS }
    if (!preparedBy) newErrors.preparedBy = "This field is required";
    if (!approvedBy) newErrors.approvedBy = "This field is required";
    if (!division) newErrors.division = "This field is required";
    setErrors(newErrors);
        
    if (preparedBy && approvedBy && division) {
        const form: AssetForm = {
            date: new Date(),
            division,
            reqNo,
            remarks,
            data: rows,
            preparedBy,
            approvedBy
        }
        const result = await addForm(form);
        if (result && !result.error) {
          setLoading("Generating PDF")
          const blob = await pdf(
            <FARFormPDF
              date={getCurrentDate()}
              division={division}
              reqNo={reqNo}
              rows={rows}
              remarks={remarks}
              approvedBy={approvedBy}
              preparedBy={preparedBy}
            />
          ).toBlob();
            saveAs(blob, `${reqNo.split("/").join("-")}.pdf`);

            setLoading(false);
            setRows([{ ...ROW }]);
            setDivision("");
            setRemarks("");
            setPreparedBy("");
            setApprovedBy("");
            setReqNo(getNewReqNo(reqNo));
        }

    } else {
        setLoading(false);
    }
  }

  return (
    <div className="form-container">
      {loading ? <Loader message={typeof loading === 'string' ? loading : ''} /> : null }
      <div className="df mb-4">
        <div style={{ flex: 1 }}>
          <Input.Date label="Date" value={getCurrentDate()} />
          <Input.Select
            label="Division"
            options={["HRD", "ICTD", "CDD", "FD"]}
            value={division}
            onChange={e => setDivision(e.target.value)}
            error={errors.division}
          />
          <Input.Text value={reqNo} label="Requisition Number" readOnly />
        </div>

        <div className="ml-4" style={{ flex: 1 }}>
          <label className="label">Remarks</label>
          <textarea onChange={(e) => setRemarks(e.target.value)} value={remarks} placeholder="Remarks" className="input textarea"></textarea>
        </div>
      </div>

      <DynamicTable
        rows={rows}
        handleChange={handleChange}
        editingRow={editingRow}
        setEditingRow={(r: number) => setEditingRow(r)}
        setRows={(r: AssetFormRow[]) => setRows(r)}
      />

      <div className="df jce">
        <Button onClick={addRow}>Add Row</Button>
      </div>

      <div className="df aic mt-3">
        <Input.Text
          style={{ flex: 1, marginRight: "40px" }}
          label="Prepared By"
          labelTop={true}
          value={preparedBy}
          onChange={e => setPreparedBy(e.target.value)}
          error={errors.preparedBy}
        />
        <Input.Select
          style={{ flex: 1 }}
          label="Approved By"
          labelTop={true}
          options={["Majidha", "Wahid", "Maadh"]}
          value={approvedBy}
          onChange={e => setApprovedBy(e.target.value)}
          error={errors.approvedBy}
        />
        </div>

        <div className="df jce mt-3">
            <Button onClick={saveAndDownload}>Save & Download PDF</Button>
        </div>
    </div>
  );
};

export default FARForm;
