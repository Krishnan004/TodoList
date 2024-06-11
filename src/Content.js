import React from 'react'
import ListItems from './ListItems';


const Content = ({ items, handleDelete,handleCheck,setItems,setFetchError,API_URL }) => {

    return (
       
            <main>
                {(items.length) ? (
                    <ul className="p-4">

                        {items.map((item) =>

                            <ListItems
                                item={item}
                                handleDelete={handleDelete}
                                key={item.id}
                                setItems={setItems}
                                handleCheck={handleCheck}
                                setFetchError={setFetchError}
                                API_URL={API_URL}
                            />

                        )}

                    </ul>
                ) : (<p className="ml-16 my-8 text-2xl font-mono "> Your list is empty</p>)
                }
            </main>
       
    )
}

export default Content
