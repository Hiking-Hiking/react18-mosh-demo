import React, { useEffect, useState } from "react";

const ProduceList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);
  //   useEffect如果不传入第二个参数，更新state，会导致无限更新渲染组件而陷入死循环；
  //   useEffect(() => {
  //     console.log("Fetch products");
  //     setProducts(["Clothing", "Household"]);
  //   });
  useEffect(() => {
    console.log("Fetching products in ", category);
    setProducts(["Clothing", "Household"]);
  }, [category]);
  return <div>ProductList {products}</div>;
};

export default ProduceList;
