/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ProductDetailsComponents from "../../components/ProductDetailsComponents/ProductDetailsComponents";
import { useNavigate, useParams } from "react-router-dom";

// link tới trang --OrderService--
import * as CommentService from "../../services/CommentService";
// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { useSelector } from "react-redux";
import {
  WrapperInput,
  WrapperTextarea,
  WrapperContentPopup,
  WrapperImgAvatar,
  Wrapper,
  NavigationProductDetail,
  NavigationProductDetailLink,
  Container,
  Title,
  CommentList,
  CommentItem,
  CommentContent,
  CommentWrapper,
  UserName,
  CommentDate,
  CommentText,
  CommentPopover,
} from "./style";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import { useQuery } from "@tanstack/react-query";
import { Popover } from "antd";
import Loading from "../../components/loadingComponents/Loading";
import { useMediaQuery } from "react-responsive";

const ProductDetailsPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 740px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 740px) and (max-width: 1030px)",
  });
  // sẽ dùng cái thằng này để lấy ra --id của product-- này
  const { id } = useParams();
  // console.log('parasm-id', id)
  // lấy ra cái thằng user ra để bắt đầu thanh toán
  const user = useSelector((state) => state.user);
  const [reloadData, setReloadData] = useState(false);
  // console.log('usercomment', user)

  const [comment, setComment] = useState("");

  // chuyển trang
  const navigate = useNavigate();

  // console.log('thong tin', user?.name, user?.id, id, user?.name, user?.avatar)

  const handleOnchangeComment = (value) => {
    // dùng để chuyền dữ liệu mới từ thanh input vào --set-- lại
    setComment(value);
  };

  // bắt đầu làm dữ liệu xuống backend để --update--
  const mutationAddComment = useMutationHooks(
    (data) => {
      const { ...rests } = data;
      const res = CommentService.createComment({ ...rests });

      // Sử dụng then() để xử lý kết quả của Promise
      res
        .then((result) => {
          // Truy cập vào dữ liệu trong kết quả
          const message = result.message;
          const status = result.status;
          // Xử lý dữ liệu ở đây
          if (status === "ERR") {
            alert(message);
          }
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Lỗi khi lấy dữ liệu:", error);
        });

      return res;
    },
    {
      onSuccess: () => {
        setComment("");
      },
      onError: () => {
        // Xử lý lỗi khi thêm comment không thành công
      },
    }
  );

  // bắt đầu chuyển sang trang xác nhận mua hàng và thanh toán ------------------------
  const handleAddComment = () => {
    mutationAddComment.mutate({
      name: user?.name,
      id_user: user?.id,
      id_product: id,
      user_comments: comment,
      image_comments: user?.avatar,
    });
    // Xóa dữ liệu trên thanh input
    setComment("");
  };




  // hàm dùng để loard dữ liệu lên trên client phía admin
  const getAllComment = async (limitTest) => {
    const id_product = limitTest?.queryKey && limitTest?.queryKey[1];
    // console.log('id_user111', id_user)
    // console.log('id_product111', id_product)
    const res = await CommentService.getAllComment({ id_product });
    // console.log('res', res)
    return res;
  };

  // dùng để loard dữ liệu lên trên client phía admin
  const queryComment = useQuery({
    queryKey: ["comment", id],
    queryFn: getAllComment,
  });


  const { isPending: isPendingComment, data: dataComment } = queryComment;
  // lúc này đã có dữ liệu thông qua --data: users--
  // console.log('data comment', queryComment)
  // console.log("data comment", dataComment);

  // Lấy dữ liệu comments từ phản hồi (response)
  const commentsData = dataComment?.data || [];

  useEffect(() => {
    setReloadData(true);
    queryComment.refetch();
    setReloadData(false); // Sau khi tải lại dữ liệu, đặt lại giá trị của reloadData thành false
  }, [mutationAddComment.isSuccess, reloadData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute < 10 ? "0" + minute : minute;
    const formattedDate = `${formattedHour}:${formattedMinute} ${ampm} ${date.getDate()}/${date.getMonth() + 1
      }/${date.getFullYear()}`;
    return formattedDate;
  };

  // console.log('user?.access_token', user?.access_token)

  const hanldeRemove = async (id) => {
    setReloadData(true);
    const res = await CommentService.deleteComment(id);
    setReloadData(false);
    return res;
  };

  // const hanldeUpdate = async (id, data, access_token) => {
  //     const res = await CommentService.updateComment(id, data, access_token)
  // }

  // khi kik vào sẽ hiển thị chữ --đăng xuất và thông tin người dùng--
  const content = ({ id, data, token }) => (
    <div>
      <WrapperContentPopup onClick={() => hanldeRemove(id)}>
        Xóa comment
      </WrapperContentPopup>
      {/* <WrapperContentPopup onClick={() => hanldeUpdate(id, data)}>Sửa comment</WrapperContentPopup> */}
    </div>
  );

  return (
    <Wrapper>
      <NavigationProductDetail>
        <h3 style={{ marginBottom: "15px" }}>
          <NavigationProductDetailLink onClick={() => navigate("/")}>
            Trang chủ
          </NavigationProductDetailLink>
          <span> / Chi tiết sản phẩm</span>
        </h3>
        {/* sau khi có --id-- ta sẽ chuyền vào */}
        <ProductDetailsComponents idProduct={id} />
      </NavigationProductDetail>

      <Loading isPending={isPendingComment}>
        <div style={{ marginLeft: isMobile ? "0%" : "7.5%" }}>
          {/* Hiển thị danh sách comment */}
          {/* <div  style={{ borderTop: '1px solid #ddd', padding: '20px', marginTop: "50px", backgroundColor: "#ffff", width: isMobile ? '100%' : '92%' }}>
                        <h3 style={{ width: '100%', marginBottom: '20px', color: '#06386b', paddingBottom: '10px', textAlign: "center", fontWeight:'bold'}}>Danh sách comment</h3>
                        <ul style={{ listStyleType: 'none', padding: '0' }}>
                            {commentsData.map((comment, index) => (
                                <li key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                                        <WrapperImgAvatar src={comment?.image_comments} alt="avatar" />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <p style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', marginRight: '10px' }}>{comment.name}</p>
                                                <p style={{ marginBottom: '5px' }}>{formatDate(comment.createdAt)}</p>
                                            </div>

                                            <div style={{ fontSize: '17px', color: '#555', whiteSpace: 'pre-wrap', maxWidth: '80%' }}>
                                                <Popover content={content({id: comment?._id, data: comment.user_comments , token: user?.access_token})} trigger="click" >
                                                    // khi đăng nhập vào sẽ có được cái --user(name)--
                                                    <div style={{ cursor: 'pointer', color: '#000' }}>{comment.user_comments}</div>
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div> */}

          <Container $isMobile={isMobile}>
            <Title>Danh sách comment</Title>
            <CommentList>
              {commentsData.map((comment, index) => (
                <CommentItem key={index}>
                  <CommentContent>
                    <WrapperImgAvatar
                      src={comment?.image_comments}
                      alt="avatar"
                    />
                    <CommentWrapper>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UserName>{comment.name}</UserName>
                        <CommentDate>
                          {formatDate(comment.createdAt)}
                        </CommentDate>
                      </div>
                      <CommentText>
                        <Popover
                          content={content({
                            id: comment?._id,
                            data: comment.user_comments,
                            token: user?.access_token,
                          })}
                          trigger="click"
                        >
                          <CommentPopover>
                            {comment.user_comments}
                          </CommentPopover>
                        </Popover>
                      </CommentText>
                    </CommentWrapper>
                  </CommentContent>
                </CommentItem>
              ))}
            </CommentList>
          </Container>

          <WrapperInput>
            {/* nút button */}
            <WrapperTextarea
              value={comment}
              onChange={(e) => handleOnchangeComment(e.target.value)}
              placeholder="Nhập bình luận của bạn..."
            />
            <ButtonComponents
              // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignIn--
              onClick={handleAddComment}
              // bordered={false}
              size={40}
              styleButon={{
                height: "40px",
                width: isMobile ? "29%" : "15%",
                borderRadius: "4px",
              }}
              textButton={"Comment"}
              styleTextButon={{
                color: "#06386b",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                fontWeight: "400",
                textAlign: "center",

              }}
            ></ButtonComponents>
            {/* nơi nhập vào email */}
            {/* <WrapperLabel htmlFor="comment">comment</WrapperLabel> */}
            {/* đặt id cho --input-- để tý lấy dữ liệu thông qua id */}
            {/* <InputForm style={{ width: '100%' }} id="name" value={comment} onChange={handleOnchangeComment} /> */}
          </WrapperInput>
          <br></br>
        </div>
      </Loading>
    </Wrapper>
  );
};

export default ProductDetailsPage;
