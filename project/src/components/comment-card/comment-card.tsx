import { CommentReview } from '../../types/comment';

type Props = {
  commentCard: CommentReview;
}

function CommentCard({commentCard}: Props): JSX.Element {
  const date = new Date(commentCard.date).toDateString();
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{commentCard.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{commentCard.user.name}</cite>
          <time className="review__date" dateTime={commentCard.date}>{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{commentCard.rating}</div>
    </div>
  );
}

export default CommentCard;
