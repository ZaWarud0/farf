import React, { useEffect, useState } from 'react';
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

  const [width, setWidth] = useState(window.innerWidth);

    const deleteRow = (i: number) => {
        const newRows = rows.filter((row, index) => index !== i);
        setRows(newRows.map((row, i) => {
            row.no = i + 1;
            return row;
        }));
        setEditingRow(rows.length - 2);
    }

    useEffect(() => {
      window.addEventListener("resize", () => setWidth(window.innerWidth));
      return () => window.addEventListener("resize", () => setWidth(window.innerWidth));
    });

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

      const renderResponsiveRow = () => {
        return rows.map((r, i) => (
          <div key={i} className="list">
              <ul>
                <li>
                  <div className="df aic">No</div>
                  <div className="df aic">{r.no}</div>
                </li>
                <li>
                  <div className="df aic">Budget Code</div>
                  <div className="df aic">
                    {editingRow === i ? 
                      (<input onChange={e => handleChange("budgetCode", i, e.target.value)} className="input" type="text" value={r.budgetCode} />) : 
                      r.budgetCode}
                  </div>
                </li>
                <li>
                  <div className="df aic">Quantity</div>
                  <div className="df aic">
                    {editingRow === i ? 
                      (<input onChange={e => handleChange("quantity", i, e.target.value)} min={0} className="input" type="number" value={r.quantity === 0 ? "" : r.quantity} />) : 
                      r.quantity}
                  </div>
                </li>
                <li>
                  <div className="df aic">Description</div>
                  <div className="df aic">
                    {editingRow === i ? 
                      (<input onChange={e => handleChange("description", i, e.target.value)} className="input" type="text" value={r.description} />) : 
                      r.description}
                  </div>
                </li>
                <li>
                  <div className="df aic">Budgeted Amount</div>
                  <div className="df aic">
                    {editingRow === i ? 
                      (<input onChange={e => handleChange("budgetedAmount", i, e.target.value)} min={0} className="input" type="number" value={r.budgetedAmount === 0 ? "" : r.budgetedAmount} />) : 
                      r.budgetedAmount}
                  </div>
                </li>
                <li>
                  <div className="df aic">Location</div>
                  <div className="df aic">
                    {editingRow === i ? 
                      (<input onChange={e => handleChange("location", i, e.target.value)} className="input" type="text" value={r.location} />) : 
                      r.location}
                  </div>
                </li>
                <li>
                  <div className="df aic">Asset PR ID</div>
                  <div className="df aic">
                    {editingRow === i ? 
                      (<input onChange={e => handleChange("assetPRID", i, e.target.value)} className="input" type="text" value={r.assetPRID} />) : 
                      r.assetPRID}
                  </div>
                </li>
                <li>
                  <div className="df aic">Asset Code</div>
                  <div className="df aic">
                    {editingRow === i ? 
                      (<input onChange={e => handleChange("assetCode", i, e.target.value)} className="input" type="text" value={r.assetCode} />) : 
                      r.assetCode}
                  </div>
                </li>
              </ul>
            </div>
        ))
      }

        return (
          <div className="table-container">
            {width > 600 ? (<table className="table">
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
              </table>) :
            renderResponsiveRow()}
          </div>
        );
}
export default Table;