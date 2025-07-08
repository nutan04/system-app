import React, { useState } from 'react';
import axios from 'axios';
import { saveOffline, getAllOfflineData, clearOfflineData } from '../utils/indexedDB';
import { jsPDF } from 'jspdf';
import '../App.css'; // Import global styles

function FormPage() {
  const [form, setForm] = useState({
    name: '', phone: '', address: '',
    qualification: '', skills: '', university: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveLocally = async () => {
    await saveOffline(form);
    alert('Saved locally');
  };

  const syncOnline = async () => {
    const allData = await getAllOfflineData();
    for (const item of allData) {
      try {
        await axios.post('http://localhost:8000/api/submit-form', item, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } catch (err) {
        console.log('Error syncing item:', err);
      }
    }
    await clearOfflineData();
    alert('Data synced with backend');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Name: ${form.name}`, 10, 10);
    doc.text(`Phone: ${form.phone}`, 10, 20);
    doc.text(`Address: ${form.address}`, 10, 30);
    doc.text(`Qualification: ${form.qualification}`, 10, 40);
    doc.text(`Skills: ${form.skills}`, 10, 50);
    doc.text(`University: ${form.university}`, 10, 60);
    doc.save('form.pdf');
  };

  return (
    <div className="formpage-container">
      <form className="formpage-form" onSubmit={e => e.preventDefault()}>
        <h2 className="formpage-title">Form</h2>
        <input name="name" className="formpage-input" placeholder="Name" onChange={handleChange} />
        <input name="phone" className="formpage-input" placeholder="Phone" onChange={handleChange} />
        <input name="address" className="formpage-input" placeholder="Address" onChange={handleChange} />
        <input name="qualification" className="formpage-input" placeholder="Qualification" onChange={handleChange} />
        <input name="skills" className="formpage-input" placeholder="Skills" onChange={handleChange} />
        <input name="university" className="formpage-input" placeholder="University" onChange={handleChange} />
        <div className="formpage-buttons">
          <button type="button" className="formpage-btn save" onClick={saveLocally}>💾 Save Offline</button>
          <button type="button" className="formpage-btn sync" onClick={syncOnline}>☁️ Sync to Backend</button>
          <button type="button" className="formpage-btn pdf" onClick={generatePDF}>📄 Generate PDF</button>
        </div>
      </form>
    </div>
  );
}

export default FormPage;
