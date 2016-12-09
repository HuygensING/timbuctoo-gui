import React from "react";
import { Link } from "react-router";
import { urls } from "../../../urls";

export default function(props) {
  const { start, list, domain } = props;
  return (
    <div className="result-list result-list-edit">
      <ol start={start + 1} style={{counterReset: `step-counter ${start}`}}>
        {list.map((entry, i) => (
          <li key={entry._id}>
            <Link to={urls.entity(domain, entry._id)} style={{display: "inline-block", width: "calc(100% - 30px)", height: "100%", padding: "0.5em 0", outline: "0"}}>
              {entry["@displayName"]}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
