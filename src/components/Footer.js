import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="wedding-data">
        <p>
          Marina: <span>630766171</span>
        </p>
        <p>
          Carlos: <span>649740450</span>
        </p>
      </div>
      <div className="wedding-aux">
        <a href="/admin">Zona Novios</a>
        <p>
          {`Made with `}
          <i className="fas fa-heart"></i>
          {` by M&M`}
        </p>
      </div>
    </footer>
  );
}
