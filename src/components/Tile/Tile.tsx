import { IconLookup } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { toHtml, icon } from "@fortawesome/fontawesome-svg-core";

import "./Tile.css"
import { TeamType } from "../Board/Board";

interface Props {
  number: number;
  piece: TeamType;
}

// helper function to convert font awesome svg to div background
function getSVGURI(faIcon: IconLookup, color: string): String {
  const abstract = icon(faIcon).abstract[0];
  if (color && abstract.children) {
    abstract.children[0].attributes.fill = color;
  }
  const res = `data:image/svg+xml;base64,${btoa(toHtml(abstract))}`;
  return res;
}

const chessPiece = (pieceNumber: TeamType) => {

  // empty block
  if (pieceNumber === 0) {
    return
  }
  
  const color = (pieceNumber === TeamType.BLUE) ? "blue" : "red";
  return <div
    className="chess-piece"
    style={{ backgroundImage: `url(${getSVGURI(faCircle, color)})` }}
  />
}

export default function Tile({ number, piece }: Props) {

  const tileColor = (number % 2 === 0) ? 'black' : 'white';

  return <div className={`tile ${tileColor}-tile`}>
    {chessPiece(piece)}
  </div>
}
