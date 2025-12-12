import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [detail, setDetail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editDetail, setEditDetail] = useState('');

  const addItem = (e) => {
    e.preventDefault(); 
    if (!name || !price || !date) return; 

    const newItem = {
      id: Date.now(), 
      name,
      price: parseFloat(price), 
      date,
      detail,
      completed: false,
    };

    setItems([...items, newItem]);  
  
    setName('');
    setPrice('');
    setDate('');
    setDetail('');
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id)); 
  };

  const toggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };


  const startEditing = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditPrice(item.price.toString()); 
    setEditDate(item.date);
    setEditDetail(item.detail);
  };


  const saveEdit = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              name: editName,
              price: parseFloat(editPrice),
              date: editDate,
              detail: editDetail,
            }
          : item
      )
    );

    setEditingId(null);
  };



  return (
    <div className="App">
      <div className='heading'>
         <h1>assignment 2</h1>
      <p>todo app</p>
      </div>

    
      <div className="main-container">
        
      
        <form onSubmit={addItem}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <textarea placeholder="Detail" value={detail} onChange={(e) => setDetail(e.target.value)} />
          <button type="submit">Shop Now!</button>
        </form>

      
        <div className="item-list">
          {items.map((item) => (
            <div
              key={item.id}
              className={`item ${item.completed ? 'completed' : ''}`}
              style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
            >
            
              {editingId === item.id ? (
                <div>
    
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                    <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                    <textarea value={editDetail} onChange={(e) => setEditDetail(e.target.value)} />
                    <button onClick={() => saveEdit(item.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Date: {item.date}</p>
                  <p>Detail: {item.detail}</p>
                  <button onClick={() => startEditing(item)}>Edit</button> 
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div> 
    </div>
  );
}

export default App;