import Header from './Header';
import Content from './Content';
import Undo from './Undo';
import AddItems from './Additems';
import AddSearch from './AddSearch';
import Completed from './Completed';
import React, { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {

  const API_URL='http://localhost:3500/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [undoItems, setUndoItems] = useState([]);
  const [search, setSearch] = useState([]);
  const [resultdata, setResultData] = useState([]);
  const [fetchError,setFetchError]=useState(null);
  const [isLoading,setIsLoading]=useState(true);

  const addItems = async (item) => {
    const id = items.length + 1; // Corrected id generation
    const time = new Date().toLocaleTimeString();
    const addNewItem = { id, checked: false, value: item, time,CompletedTime:null }; // Fixed object structure
    const listItems = [...items, addNewItem];
    await setItems(listItems);

    const postOption = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
  };

  try {
      const response = await apiRequest(API_URL, postOption);
      if (response instanceof Error) {
          throw new Error('Failed to add item to API: ' + response.message);
      }
  } catch (error) {
      setFetchError(error.message);
  }
};

const handleSubmit = async(e) => {
  e.preventDefault();
  addItems(newItem);
  setNewItem('');
};

const handleCheck = async (id) => {
  // Update local state
  const FinishTime = new Date();
  const updatedItems = items.map((item) =>
      item.id === id ? ({ ...item, checked: !item.checked, CompletedTime: FinishTime }) : item
  );
  setItems(updatedItems);
  

  // Find the item with the given id
  const selectedItem = updatedItems.find((item) => item.id === id);
  if (!selectedItem) {
      // Handle the case where the item with the given id is not found
      setFetchError('Item not found.');
      return;
  }

  // Prepare request options
  const updateOption = {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: selectedItem.checked })
  };

  try {

      // Make API request
      const requrl = `${API_URL}/${id}`;
      
      const response = await apiRequest(requrl, updateOption);
      if (response instanceof Error) {
          // Handle request error
          throw new Error('Failed to update item status: ' + response.message);
      }
  } catch (error) {
      // Handle catch block error
      setFetchError(error.message);
  }
};

  const handleDelete = async(item) => {
    const updatedItems = items.filter((preitem) => preitem.id !== item.id);
    const undolistItems = [...undoItems, item]; // Store the deleted item in undoItems
    setUndoItems(undolistItems);
     setItems(updatedItems);
    
    const deleteOption={
      method:'DELETE'
    }
    try {
      // Make API request
      const requrl =  `${API_URL}/${item.id}`;
      const response = await apiRequest(requrl, deleteOption);

      if (response instanceof Error) {
          // Handle request error
          throw new Error('Failed to update item status: ' + response.message);
      }
  } catch (error) {
      // Handle catch block error
      setFetchError(error.message);
  }
  };

  const handleUndo = async() => {
    const lastUndoneItem = undoItems.pop(); // Remove the last item from undoItems
    if (lastUndoneItem) {
      const id=items[items.length-1].id+1
      const idUpdate={...lastUndoneItem,id}
      const updatedItems = [...items, idUpdate]; // Add the last undone item back to items
      setItems(updatedItems);
      setUndoItems([...undoItems]); // Update undoItems state
     
    

    const postOption = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(idUpdate)
  };

  try {
      const response = await apiRequest(API_URL, postOption);
      if (response instanceof Error) {
          throw new Error('Failed to add item to API: ' + response.message);
      }
  } catch (error) {
      setFetchError(error.message);
  }
}
  };

  // const handleResult = () => {


  // };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received")
        const listItems = await response.json();
        await setItems(listItems);
      }
      catch (error) {
        setFetchError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => await fetchData())()
    }, 2000)
    
  }, []);

    useEffect(()=>{
      const checkedValues = items.filter(item => item.checked);
      const ListValue=checkedValues.map((item)=>(
        {value:item.value,
          time:item.CompletedTime}))
      setResultData(checkedValues);
    },[items])


  return (
    <div className="px-48 grid grid-cols-2 gap-2">
      <div className="size-96  ">
        <Header title="To do List" />
        <div className=" h-screen ">
          <AddItems
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}
          />
          <AddSearch
            search={search}
            setSearch={setSearch}
          />
          <main className="">
              {isLoading && <p>Loading...</p>}
              {fetchError && <p>{`error:${fetchError}`}</p>}
          {!isLoading && !fetchError &&<Content
            items={items.filter((item) => item.value.includes(search))}
            setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={(item) => { handleCheck(item.id); handleDelete(item); }} // Modified
            adddate={items}
            setFetchError={setFetchError}
            API_URL={API_URL}
          />}
          </main>
          <Undo handleUndo={handleUndo} />
        </div>
      </div>
      <div className="size-96 ">
        <h1 className="bg-gray-800 text-center text-white text-5xl text-center p-8">Result</h1>
        <Completed
          items={items.time}
          resultData={resultdata}
          length={resultdata.length}
          handleCheck={handleCheck}
        />

      </div>
      {/* <footer>
        <Copyright length={items.length} />
      </footer> */}
    </div>
  );
}

export default App;