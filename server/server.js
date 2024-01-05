const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors'); 
const app = express();
const port = 1234;

const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(cors());

app.get('/api', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api', async (req, res) => {
    try {
      const newData = req.body;
      const currentData = await fs.readFile(dataFilePath, 'utf8');
      let parsedData;
      console.log(currentData)
  
      try {
        parsedData = JSON.parse(currentData);
  
        if (!parsedData.products || !Array.isArray(parsedData.products)) {
          parsedData.products = [];
        }
      } catch (parseError) {
        console.error('Error parsing data:', parseError);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const lastProductId = parsedData.products.length > 0 ? parsedData.products[parsedData.products.length - 1].id : 0;
      const newProductId = lastProductId + 1;
      
      newData.id = newProductId;
  
      parsedData.products.push(newData);
  
      await fs.writeFile(dataFilePath, JSON.stringify(parsedData, null, 2));
  
      res.json({ success: true, newProductId });
    } catch (error) {
      console.error('Error creating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  
  app.put('/api/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const updatedData = req.body;
      console.log(updatedData)
      const currentData = await fs.readFile(dataFilePath, 'utf8');
      const parsedData = JSON.parse(currentData);
  
      const itemId = parseInt(id, 10);
  
      const dataIndex = parsedData.products.findIndex(item => item.id === itemId);
  
      if (dataIndex !== -1) {
        parsedData.products[dataIndex] = updatedData;
  
        await fs.writeFile(dataFilePath, JSON.stringify(parsedData, null, 2));
  
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.delete('/api/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const currentData = await fs.readFile(dataFilePath, 'utf8');
      const parsedData = JSON.parse(currentData);
  
      const itemId = parseInt(id, 10);
  
      const newData = {
        ...parsedData,
        products: parsedData.products.filter(item => item.id !== itemId),
      };
      console.log(newData)
      await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2));
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
