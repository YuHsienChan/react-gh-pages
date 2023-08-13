import React, { useState } from 'react';
import './styles.css'; // 導入你的CSS文件

function NewApp(){
    const initialNewItem = {
        id: null,
        FoodItem: '',
        description: '',
        Price: 0,
        stock: 0
    };

    const menu = [
        { id: 1, FoodItem: '珍珠奶茶', description: '香濃奶茶搭配QQ珍珠', Price: 50, stock: 20 },
        { id: 2, FoodItem: '冬瓜檸檬', description: '清新冬瓜配上新鮮檸檬', Price: 45, stock: 15 },
        { id: 3, FoodItem: '翡翠檸檬', description: '綠茶與檸檬的完美結合', Price: 55, stock: 30 },
        { id: 4, FoodItem: '四季春茶', description: '香醇四季春茶，回甘無比', Price: 45, stock: 10 },
        { id: 5, FoodItem: '阿薩姆奶茶', description: '阿薩姆紅茶搭配香醇鮮奶', Price: 50, stock: 25 },
        { id: 6, FoodItem: '檸檬冰茶', description: '檸檬與冰茶的清新組合', Price: 45, stock: 20 },
        { id: 7, FoodItem: '芒果綠茶', description: '芒果與綠茶的獨特風味', Price: 55, stock: 18 },
        { id: 8, FoodItem: '抹茶拿鐵', description: '抹茶與鮮奶的絕配', Price: 60, stock: 20 }
    ];

    const [items, setItems] = useState(menu);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [newItem, setNewItem] = useState(initialNewItem);

    const handleIncrement = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.stock > 0
                    ? { ...item, stock: item.stock - 1 }
                    : item
            )
        );
    };

    const handleDecrement = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, stock: item.stock + 1 }
                    : item
            )
        );
    };

    const handleAddItem = () => {
        if (newItem.FoodItem === '') {
            alert('品項不得為空。');
            return;
        }
        else if (newItem.Price === 0) {
            alert('價格不得為 0。');
            return;
        }

        const newId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
        setItems(prevItems => [...prevItems, { ...newItem, id: newId }]);
        setNewItem(initialNewItem);
    };

    const handleEditClick = (id, name) => {
        if (editingItemId === id) {
            // 如果點擊的是正在編輯的項目，則取消編輯模式
            setEditingItemId(null);
            setEditedName('');
        } else {
            setEditingItemId(id);
            setEditedName(name);
        }
    };

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
    };

    const handleNameBlur = (id) => {
        if (editedName.trim() !== '') {
            setItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, FoodItem: editedName } : item
                )
            );
        }
        setEditingItemId(null);
        setEditedName('');
    };

    const handleKeyPress = (e, id) => {
        if (e.key === 'Enter') {
            handleNameBlur(id);
        }
    };

    const handleDelete = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <div>
            <div className="content-center">
                <div className="table-container">
                    <img src='/images/Title.jpg' />
                    <table>
                        <thead>
                            <tr>
                                <th>品項</th>
                                <th>描述</th>
                                <th>價格</th>
                                <th>庫存</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(Item =>
                                <tr key={Item.id}>
                                    <td className='ItemName'>
                                        {editingItemId === Item.id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={editedName}
                                                    onChange={handleNameChange}
                                                    onBlur={() => handleNameBlur(Item.id)}
                                                    onKeyPress={(e) => handleKeyPress(e, Item.id)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="editable">
                                                {Item.FoodItem}
                                            </div>
                                        )}
                                    </td>
                                    <td className='ItemName'>{Item.description}</td>
                                    <td className='ItemName1'>{Item.Price}</td>
                                    <td className='ItemName1'>
                                        <button onClick={() => handleIncrement(Item.id)} disabled={Item.stock === 0}>-</button>
                                        {Item.stock}
                                        <button onClick={() => handleDecrement(Item.id)}>+</button>
                                    </td>
                                    <td className='ItemName1'>
                                        {editingItemId === Item.id ? (
                                            <button onClick={() => handleEditClick(Item.id)}>取消編輯</button>
                                            ) : (
                                            <button onClick={() => handleEditClick(Item.id, Item.FoodItem)}>編輯</button>
                                        )}
                                        <button onClick={() => handleDelete(Item.id)}>刪除</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="品項"
                                        id='InputItem'
                                        className='InputText'
                                        value={newItem.FoodItem}
                                        onChange={(e) => setNewItem({ ...newItem, FoodItem: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="描述"
                                        className='InputDescription'
                                        value={newItem.description}
                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="價格"
                                        className='InputText'
                                        value={newItem.Price}
                                        onChange={(e) => setNewItem({ ...newItem, Price: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="庫存"
                                        className='InputText'
                                        value={newItem.stock}
                                        onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <button onClick={handleAddItem}>新增</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default NewApp;