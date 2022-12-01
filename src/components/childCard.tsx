import React from "react";

interface Props {
  idAcordion: string;
  titleAcordion: string;
  cardHeader: string;
  cardTitle: string;
  body: string;
  textButton: string;
  routeUrl: string;
  style: string;
  /*information: { number: number; name: string };
  sum: (n: number) => number;*/
}

const ChildCard: React.FC<Props> = ({
  idAcordion,
  titleAcordion,
  cardHeader,
  cardTitle,
  body,
  textButton,
  routeUrl,
  style,
}) => {
  const Style = `card text-dark mb-1 bg-${style}`;
  return (
    <div>
      {" "}
      <div className={Style}>
        <div className="card-header">{cardHeader}</div>
        <div className="card-body">
          <h4 className="card-title">{cardTitle}</h4>
          <p className="card-text">{body}</p>
        </div>
        <button className="btn btn-primary btn-sm">{textButton}</button>
      </div>
    </div>
  );
};

export default ChildCard;
