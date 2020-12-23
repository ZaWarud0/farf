import React from 'react';
import { AssetFormRow } from '../types';
import './Table.css';

interface Props {
    rows: AssetFormRow[];
    editingRow: number;
    handleChange: (name: string, index: number, value: any) => void;
    setRows: (row: AssetFormRow[]) => void;
    setEditingRow: (rowNo: number) => void;
}

const Table: React.FC<Props> = ({rows, editingRow, handleChange, setRows, setEditingRow}) => {

    const deleteRow = (i: number) => {
        const newRows = rows.filter((row, index) => index !== i);
        setRows(newRows.map((row, i) => {
            row.no = i + 1;
            return row;
        }));
        setEditingRow(rows.length - 2);
    }

    const renderRow = () => {
        return rows.map((r, i) => editingRow === i ? (
          <tr className="df" key={i}>
            <td>{r.no}</td>
            <td><input onChange={e => handleChange("budgetCode", i, e.target.value)} className="input" type="text" value={r.budgetCode} /></td>
            <td><input onChange={e => handleChange("quantity", i, e.target.value)} min={0} className="input" type="number" value={r.quantity === 0 ? "" : r.quantity} /></td>
            <td><input onChange={e => handleChange("description", i, e.target.value)} className="input" type="text" value={r.description} /></td>
            <td><input onChange={e => handleChange("budgetedAmount", i, e.target.value)} min={0} className="input" type="number" value={r.budgetedAmount === 0 ? "" : r.budgetedAmount} /></td>
            <td><input onChange={e => handleChange("location", i, e.target.value)} className="input" type="text" value={r.location} /></td>
            <td><input onChange={e => handleChange("assetPRID", i, e.target.value)} className="input" type="text" value={r.assetPRID} /></td>
            <td><input onChange={e => handleChange("assetCode", i, e.target.value)} className="input" type="text" value={r.assetCode} /></td>
            <td></td>
          </tr>
        ): (
          <tr className="df" key={i}>
            <td>{r.no}</td>
            <td>{r.budgetCode}</td>
            <td>{r.quantity === 0 ? "" : r.quantity}</td>
            <td>{r.description}</td>
            <td>{r.budgetedAmount === 0 ? "" : r.budgetedAmount.toFixed(2)}</td>
            <td>{r.location}</td>
            <td>{r.assetPRID}</td>
            <td>{r.assetCode}</td>
            <td className="df jcsa">
              <div className="cp" title="Edit" onClick={() => setEditingRow(i)}>✏️</div>
              <div className="cp" title="Delete" onClick={() => deleteRow(i)}>❌</div>
            </td>
          </tr>
        ))
      }

        return (
            <table className="table">
                <thead> 
                    <tr className="df">
                        <th>No</th>
                        <th>Budget Code</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Budgeted Amount</th>
                        <th>Location</th>
                        <th>Asset PR ID</th>
                        <th>Asset Code</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderRow()}
                </tbody>
            </table>
        );
}
export default Table;