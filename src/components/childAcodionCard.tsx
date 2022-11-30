import React from "react";

import { useNavigate } from "react-router-dom";

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

const ChildAcodionCard: React.FC<Props> = ({
  idAcordion,
  titleAcordion,
  cardHeader,
  cardTitle,
  body,
  textButton,
  routeUrl,
  style,
}) => {
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/${routeUrl}`;
    navigate(url);
  };

  const Style = `card text-dark mb-1 bg-${style}`;
  return (
    <div className="accordion" id={idAcordion}>
      <div className="accordion-item">
        <h2 className="accordion-header" id={"headingOne" + idAcordion}>
          <div className={Style}>
            <span></span>
          </div>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#collapseOne" + idAcordion}
            aria-expanded="false"
            aria-controls={"collapseOne" + idAcordion}
          >
            {titleAcordion}
          </button>
        </h2>
        <div
          id={"collapseOne" + idAcordion}
          className="accordion-collapse collapse"
          aria-labelledby={"headingOne" + idAcordion}
          data-bs-parent={"#" + idAcordion}
        >
          <div></div>

          <div>
            {" "}
            <div className={Style}>
              <div className="card-header">{cardHeader}</div>
              <div className="card-body">
                <h4 className="card-title ">{cardTitle}</h4>
                <p className="card-text">{body}</p>
              </div>
              <button
                onClick={() => navigateTo(routeUrl)}
                className="btn btn-primary btn-sm"
              >
                {textButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildAcodionCard;

//<button onClick={() => this.nextPath("/the/path")}>change path</button>;
