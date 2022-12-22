import { IconLookup } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faChessKing } from '@fortawesome/free-solid-svg-icons'
import { toHtml, icon } from "@fortawesome/fontawesome-svg-core";

import "./Tile.css"
import { PieceType, TeamType } from '../../Constants';

interface Props {
  id: string
  number: number;
  pieceTeam: TeamType;
  pieceType: PieceType;
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

const chessPiece = (pieceTeam: TeamType, pieceType: PieceType, id:string) => {

  // empty block
  if (pieceTeam === 0) {
    return
  }

  const color = (pieceTeam === TeamType.BLUE) ? "blue" : "red";
  const logo = (pieceType === PieceType.PAWN) ? faCircle : faChessKing;

  const team = (pieceTeam === TeamType.RED) ? "red" : "blue";
  return <div
    className={`chess-piece ${team}  ${id}`}
    style={{ backgroundImage: `url(${getSVGURI(logo, color)})` }}
  />
}

export default function Tile({ id, number, pieceTeam, pieceType }: Props) {

  const tileColor = (number % 2 === 0) ? 'black' : 'white';
  return <div className={`tile ${tileColor}-tile`}>
    {chessPiece(pieceTeam, pieceType, id)}
  </div>
}
