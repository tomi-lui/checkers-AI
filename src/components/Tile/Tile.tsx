import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconLookup, IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { toHtml, icon } from "@fortawesome/fontawesome-svg-core";

import "./Tile.css"

interface Props {
  number: number;
  piece: number;
}

function getSVGURI(faIcon: IconLookup, color: string): String {
  const abstract = icon(faIcon).abstract[0];
  if (color && abstract.children) {
    abstract.children[0].attributes.fill = color;
  }
  const res = `data:image/svg+xml;base64,${btoa(toHtml(abstract))}`;
  console.log("HERE");
  console.log(res);
  return res;
}

const chessPiece = (pieceNumber: number) => {

  // empty block
  if (pieceNumber == 0) {
    return <></>
  }
  
  // blue piece
  if (pieceNumber == 1) {
    return <div >
      <div
        className="chess-piece"
        style={{ backgroundImage: `url(${getSVGURI(faCircle, "blue")})` }}
      />
    </div>
  }
  // red piece
  else if (pieceNumber == 2) {
    return <div
      className="chess-piece"
      style={{ backgroundImage: `url(${getSVGURI(faCircle, "red")})` }}
    />
  }
}

export default function Tile({ number, piece }: Props) {
  if (number % 2 === 0) {
    return <div className="tile black-tile">
      {chessPiece(piece)}
    </div>
  }
  else {
    return <div className="tile white-tile">
      {chessPiece(piece)}
    </div>
  }
}
