import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import "./Style.css";

const ProductDetails = () => {
  const [auth] = useAuth();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newReplies, setNewReplies] = useState({}); // Store new replies here
  const [requestSent, setRequestSent] = useState(false); // New state variable


  const isAdopter = auth?.user?.role === 0;
  const nonLog = !auth?.user;
  const navigate = useNavigate();

  const getComments = useCallback(async (productId) => {
    try {
      const { data } = await axios.get(`/api/v1/comments/${productId}`);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);

  const getProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data.product);

      if (data.product && data.product._id) {
        getComments(data.product._id);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  }, [params.slug, getComments]);

  const checkAdoptionRequest = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/v1/adoption/check/${product._id}`);
      setRequestSent(data.requestSent);
    } catch (error) {
      console.error("Error checking adoption request:", error);
    }
  }, [product._id]);

  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
  }, [params.slug, getProduct]);

  useEffect(() => {
    if (product._id && auth?.user) {
      checkAdoptionRequest();
    }
  }, [product._id, auth.user, checkAdoptionRequest]);

  const handleCommentSubmit = async () => {
    if (!auth?.user) {
      toast.error('Please log in to comment.');
      navigate('/login');
      return;
    }

    if (newComment.trim() === '') {
      toast.warn("Comment cannot be empty.");
      return;
    }

    try {
      const { data } = await axios.post('/api/v1/comments', {
        productId: product._id,
        text: newComment,
        userId: auth.user._id, // Include the user ID
        userName: auth.user.name, // Include the user name
      });

      const newCommentWithUser = {
        ...data.comment,
        userId: { _id: auth.user._id, name: auth.user.name },
      };

      setComments((prevComments) => [...prevComments, newCommentWithUser]);
      window.location.reload();
      setNewComment(''); // Clear the new comment input
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleReplyChange = (commentId, value) => {
    setNewReplies((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleReplySubmit = async (commentId) => {
    if (!auth?.user) {
      toast.error('Please log in to reply.');
      navigate('/login');
      return;
    }

    if (!newReplies[commentId] || newReplies[commentId].trim() === '') {
      toast.warn("Reply cannot be empty.");
      return;
    }

    try {
      const { data } = await axios.post(`/api/v1/comments/replies`, {
        commentId,
        text: newReplies[commentId],
        userId: auth.user._id, // Include the user ID
        userName: auth.user.name, // Include the user name
      });

      const newReply = {
        ...data.reply,
        userId: { _id: auth.user._id, name: auth.user.name },
      };

      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment._id === commentId) {
            comment.replies = comment.replies ? [...comment.replies, newReply] : [newReply];
          }
          return comment;
        });
      });

      // Clear the reply input
      setNewReplies((prev) => ({
        ...prev,
        [commentId]: '',
      }));
      window.location.reload();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };


  const handleAdoptionRequest = async () => {
    if (!auth?.user) {
      toast.error("Please log in to adopt.");
      navigate("/login");
      return;
    }
  
    // Confirm adoption request
    const confirmed = window.confirm("Are you sure you want to send an adoption request?");
    if (!confirmed) return;
  
    try {
      // Send adoption request to the server
      await axios.post("/api/v1/adoption", {
        productId: product._id, // Product being adopted
        userId: auth.user._id, // User making the request
      });
  
      toast.success("Adoption request sent!"); // Success feedback
      setRequestSent(true);
    } catch (error) {
      console.error("Error creating adoption request:", error);
      toast.error("Failed to send adoption request.");
    }
  };
  


  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/v1/comments/delete/${commentId}`);
      setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment");
    }
  };
  const handleDeleteReply = async (commentId, replyId) => {
    try {
      await axios.delete(`/api/v1/comments/replies/delete/${commentId}/${replyId}`);
      setComments((prevComments) => {
        return prevComments.map(comment => {
          if (comment._id === commentId) {
            comment.replies = comment.replies.filter(reply => reply._id !== replyId);
          }
          return comment;
        });
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Error deleting reply");
    }
  };
  const handleEditComment = async (comment) => {
    const editedText = prompt("Edit your comment:", comment.text); // Prompt the user to edit the comment text
    if (editedText === null) return; // If the user cancels editing, do nothing
    try {
      await axios.put(`/api/v1/comments/edit/${comment._id}`, { content: editedText }); // Pass edited text in the request body
      // Update the comment in the UI
      setComments((prevComments) =>
        prevComments.map((prevComment) =>
          prevComment._id === comment._id ? { ...prevComment, text: editedText } : prevComment
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error editing comment:", error);
      toast.error("Error editing comment");
    }
  };

  const handleEditReply = async (comment, reply) => {
    const editedText = prompt("Edit your reply:", reply.text); // Prompt the user to edit the reply text
    if (editedText === null) return; // If the user cancels editing, do nothing
    try {
      await axios.put(`/api/v1/comments/replies/edit/${comment._id}/${reply._id}`, { content: editedText }); // Pass edited text in the request body
      // Update the reply in the UI
      setComments((prevComments) =>
        prevComments.map((prevComment) =>
          prevComment._id === comment._id
            ? {
              ...prevComment,
              replies: prevComment.replies.map((prevReply) =>
                prevReply._id === reply._id ? { ...prevReply, text: editedText } : prevReply
              ),
            }
            : prevComment
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error editing reply:", error);
      toast.error("Error editing reply");
    }
  };

  return (
    <Layout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bgColor">
          <div className="row container mt-2">
            <div className="col-md-6" style={{ paddingLeft: '100px' }}>
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                height="365px"
                style={{ width: "300px" }}
              />
            </div>
            <div className="col-md-6">
              <h1 className="text-center">Pet Details</h1>
              <h6>Name : {product.name}</h6>
              <h6>Age : {product.age}</h6>
              <h6>Breed : {product?.breed}</h6>
              <h6>Category : {product?.category?.name}</h6>
              {(isAdopter || nonLog) && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAdoptionRequest}
                    disabled={requestSent} // Disable if request was sent
                  >
                    {requestSent ? "Request Sent" : "Adopt"}
                  </button>
                )}

            </div>
          </div>

          <h1>Shelter Name: {product?.postedBy?.name || "Unknown"}</h1>
          <div className="product-description">
            <h1 className="description-title">Description</h1>
            <p className="description-text">{product.description}</p>
          </div>

          <div className="comment-section">
            <h1 className="comment-title">Comments</h1>
            {comments.length > 0 ? (
              <div className="comment-list">
                {comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <strong className="comment-author">{comment.userId?.name || "Anonymous"}:</strong>
                    <p className="comment-text">{comment.text}</p>
                    {comment.userId?._id === auth.user?._id && (
                      <div className="comment-actions">
                        <button onClick={() => handleEditComment(comment)} className="edit-comment">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteComment(comment._id)} className="delete-comment">
                          Delete
                        </button>
                      </div>
                    )}
                    <div className="reply-section">
                      <textarea
                        value={newReplies[comment._id] || ''}
                        onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                        placeholder="Write your reply..."
                        className="reply-input"
                      />
                      <button
                        onClick={() => handleReplySubmit(comment._id)}
                        className="reply-submit"
                      >
                        Submit
                      </button>
                    </div>
                    {comment.replies && comment.replies.map((reply, index) => (
                      <div key={index} className="reply">
                        <strong className="reply-author">{reply.userId?.name || "Anonymous"}:</strong>
                        <p className="reply-text">{reply.text}</p>
                        {reply.userId?._id === auth.user?._id && (
                          <div className="reply-actions">
                            <button onClick={() => handleEditReply(comment, reply)} className="edit-reply">
                              Edit
                            </button>
                            <button onClick={() => handleDeleteReply(comment._id, reply._id)} className="delete-reply">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

              </div>
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="comment-input"
            />
            <button onClick={handleCommentSubmit} className="comment-submit">
              Submit
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;