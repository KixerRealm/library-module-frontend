import React from "react";
import {Link} from "react-router-dom";

const BookTerm = (props) => {
    return (
        <tr>
            <th scope={"col"}>{props.term.name}</th>
            <th scope={"col"}>{props.term.category.name}</th>
            <th scope={"col"}>{props.term.author.name}</th>
            <th scope={"col"}>{props.term.availableCopies}</th>
            <td scope={"col"} className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
                <Link className={"btn btn-info ml-2"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
                <Link className={"btn btn-info ml-2"}
                      onClick={() => props.onTake(props.term.id)}
                      to={`/books/${props.term.id}/take`}>
                    Mark as taken
                </Link>
            </td>
        </tr>
    );
}

export default BookTerm;