import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import categories from "../categories";
// 报错：直接使用z.object({category: z.enum(categories)});会报错(in promise) ReferenceError: Cannot access 'categories' before initialization；
// 原因：这个错误是由于循环依赖（circular dependency）引起的。当你尝试在 zod schema 中使用 categories 时，JavaScript 引擎还没有完全初始化 categories 变量。这是因为 import 语句和模块的初始化是有顺序的，而这个顺序可能导致 categories 在被使用时还未被完全定义。
// 解决办法：
// 1.(推荐)将 categories 定义移至单独的文件：创建一个新文件，比如 categories.ts，然后在其他文件中导入;
//export const categories = ["category1", "category2", "category3"] as const;
//import ....
// 2.(试过，有效)使用 zod 的 lazy方法来延迟 schema 的评估：
// const schema = z.lazy(() => z.object({category: z.enum(categories),}));
//3.(没试过)使用类型断言：如果你确定 categories 的值，可以使用类型断言：
//4.(没试过)动态创建 schema：你可以在 categories 被完全初始化后动态创建 schema：

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters" })
    .max(50, { message: "Description should be at most 50 characters" }),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01)
    .max(100_000),
  // enum 枚举是许多值中的一个;这里传入的值必须是常量或者只读值，所以App.tsx中定义categories的地方，后面要加上as const，这是ts的做法;
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});
type ExpenseFromData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFromData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFromData>({ resolver: zodResolver(schema) });
  return (
    <form
      action=""
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        //提交表单之后要重置表单
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
