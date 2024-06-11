


const AddItems = ({newItem,setNewItem,handleSubmit}) => {
    return (
        <form className="mx-8 my-2"  onSubmit={handleSubmit} >
            <input
                className="w-64  border-2  rounded-l-xl shadow-xl"
                autoFocus
                type="text"
                required
                value={newItem}
                onChange={(e)=>setNewItem(e.target.value)}
            />
            <button   
            className="border-2 rounded-r-xl shadow-xl hover:bg-gray-600 hover:transition duration-150 hover:text-white"
            type="submit">
            Add
            </button>
        </form>
    );
}

export default AddItems;