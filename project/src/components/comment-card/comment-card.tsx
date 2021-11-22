import { CommentReview } from '../../types/comment';

type Props = {
  comment: CommentReview;
}

function CommentCard({comment}: Props): JSX.Element {
  const date = new Date(comment.date).toDateString();
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={comment.date}>{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating}</div>
    </div>
  );
}

export default CommentCard;
