import React from "react";

interface Props {
  title: string;
  content: string;
  information: { number: number; name: string };
  sum: (n: number) => number;
}

const Children: React.FC<Props> = ({ title, content, information, sum }) => {
  console.log(sum(5)); // 7

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <p>{information.number}</p>
      <p>{information.name}</p>
    </div>
  );
};

export default Children;
