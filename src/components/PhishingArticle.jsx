import React from "react";

export const PhishingArticle = (props) => {
  const data = props.data;

  if (!data) {
    return <div>Loading...</div>; // Handle undefined data
  }

  return (
    <div id="phishing-article" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>{data.title}</h2>
        </div>
        <div className="article-content text-left">
          <p>{data.introduction}</p>

          <h3>Impact and Statistics</h3>
          {data.details.map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}

          <h3>Types of Phishing Attacks</h3>
          {data.types.map((type, index) => (
            <div key={index}>
              <h4>{type.name}</h4>
              <p>{type.description}</p>
            </div>
          ))}

          <h3>How to Protect Yourself</h3>
          <ul>
            {data.protectionTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
