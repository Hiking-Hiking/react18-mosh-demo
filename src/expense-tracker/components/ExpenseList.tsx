import React from "react";

interface expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            {/* <td>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  -
                </button>
              </span>
              <input type="text" value={expense.amount} />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  +
                </button>
              </span>
            </td> */}
            <td>{expense.category}</td>
            <td>
              {/* <button onClick={onDelete(expense.id)}>Delete</button> onClick报错*/}
              {/* 这个错误是因为 onClick属性期望的是一个函数类型 MouseEventHandler<HTMLButtonElement>或 undefined，但是你传递的是一个直接调用 onDelete函数的表达式 onDelete(expense.id).
                在 TypeScript 中,onClick属性期望的是一个函数,当用户点击按钮时,这个函数会被调用并传入一个 MouseEvent对象。但是你传递的是一个直接调用 onDelete函数的表达式,这个表达式的返回值是 void,这与 onClick属性期望的函数类型不匹配,所以报错了。 
                解决方案：
                    1.使用箭头函数包裹onDelete函数调用；
                    <button onClick={()=>handleDelete(expense.id)}>Delete</button>
                    2.定义一个专门的事件处理函数；
                    const handleDelete = () => {onDelete(expense.id);};
                    <button onClick={handleDelete}>Delete</button>
                    3.如果 onDelete函数本身就是一个事件处理函数,那么可以直接将其传递给 onClick属性;
                    <button onClick={onDelete}>Delete</button>
                */}
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            $
            {expenses
              .reduce((acc, expense) => acc + expense.amount, 0)
              .toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
