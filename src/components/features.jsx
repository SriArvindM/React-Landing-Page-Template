import React from "react";

export const Features = (props) => {
  const { data } = props;

  if (!data) {
    return <div>Loading...</div>; // Handle undefined data
  }

  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row">
          {data.length > 0
            ? data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-12 col-md-6">
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "No features available."}
        </div>
      </div>
    </div>
  );
};
