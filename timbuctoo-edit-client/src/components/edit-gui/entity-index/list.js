import React from "react";
import { Link } from "react-router";
import { urls } from "../../../urls";

export default function(props) {
  const { start, list, domain, selectedId, entityPending } = props;

  return (
    <div className="result-list result-list-edit" >
      <ol start={start + 1} style={{counterReset: `step-counter ${start}`}}>
        {list.map((entry, i) => (
          <li key={`${i}-${entry._id}`}>
            {entityPending
              ? (
                <a style={{
                  display: "inline-block", width: "calc(100% - 30px)", height: "100%", padding: "0.5em 0",
                  cursor: "default", opacity: "0.5", textDecoration: "none", fontWeight: "300"
                }}>
                  {entry["@displayName"]}
                </a>
              ) : (
                <Link to={urls.entity(domain, entry._id)} style={{
                  display: "inline-block", width: "calc(100% - 30px)", height: "100%", padding: "0.5em 0",
                  fontWeight: selectedId === entry._id ? "500" : "300"
                }}>

                  {entry["@displayName"]}
                </Link>
              )
            }
          </li>
        ))}
      </ol>
    </div>
  )
}
