# WeConnect App

![image](https://github.com/user-attachments/assets/74bc8e1c-14ca-419f-a1ac-48b36e48eb79)


**WeConnect App** là một ứng dụng mạng xã hội hiện đại, cho phép người dùng kết nối, chia sẻ bài viết, nhắn tin thời gian thực, và quản lý quan hệ bạn bè. Được xây dựng với **React**, **Redux Toolkit**, **Material-UI**, và **TailwindCSS**, ứng dụng mang đến trải nghiệm mượt mà và giao diện responsive. Backend sử dụng API RESTful và WebSocket để hỗ trợ các tính năng tương tác thời gian thực.

---

## 🚀 Tính Năng

- **Xác Thực & Phân Quyền**:
  - Đăng ký và đăng nhập bằng email/mật khẩu.
  - Quên mật khẩu với xác minh OTP.
  - Thay đổi mật khẩu cho tài khoản đã đăng nhập.
  - Xác thực dựa trên token với cơ chế làm mới token.

- **Bài Viết**:
  - Tạo bài viết với nội dung văn bản và hình ảnh (hỗ trợ tải lên qua `react-dropzone`).
  - Thích và bình luận bài viết với cập nhật lạc quan.
  - Cuộn vô hạn để tải thêm bài viết.

- **Hệ Thống Kết Bạn**:
  - Tìm kiếm người dùng và gửi yêu cầu kết bạn.
  - Chấp nhận hoặc hủy yêu cầu kết bạn đang chờ.
  - Xem danh sách bạn bè và bắt đầu nhắn tin.

- **Nhắn Tin**:
  - Nhắn tin thời gian thực với bạn bè qua `socket.io-client`.
  - Giao diện nhắn tin thân thiện, hỗ trợ thông báo.

- **Xác Thực Biểu Mẫu**:
  - Sử dụng `react-hook-form` và `yup` để quản lý và xác thực biểu mẫu.

- **Giao Diện Người Dùng**:
  - Thiết kế responsive với **Material-UI** và **TailwindCSS**.
  - Hiệu ứng chuyển động mượt mà nhờ **Framer Motion**.
  - Font chữ tùy chỉnh với `@fontsource-variable/public-sans`.

---

## 🛠 Công Nghệ Sử Dụng

### Frontend
- **React** v19: Xây dựng giao diện người dùng.
- **Redux Toolkit**: Quản lý trạng thái và tương tác API với RTK Query.
- **Material-UI**: Thành phần giao diện responsive.
- **TailwindCSS**: Tiện ích CSS để tùy chỉnh giao diện.
- **React Router**: Điều hướng phía client.
- **Socket.IO Client**: Nhắn tin thời gian thực.
- **React Hook Form & Yup**: Xác thực biểu mẫu.
- **React Dropzone**: Tải lên hình ảnh.
- **Framer Motion**: Hiệu ứng động.
- **Redux Persist**: Lưu trữ trạng thái qua các lần tải trang.
- **Day.js**: Định dạng ngày giờ.
- **React Toastify**: Thông báo người dùng.
- **Lodash**: Thư viện tiện ích.
- **@fontsource-variable/public-sans**: Font chữ tùy chỉnh.

### Công Cụ Phát Triển
- **Vite**: Công cụ build nhanh.
- **ESLint**: Kiểm tra mã nguồn.
- **Prettier**: Định dạng mã, hỗ trợ TailwindCSS.
- **PostCSS & Autoprefixer**: Tăng khả năng tương thích CSS.

### Backend (Giả định)
- API RESTful cho xác thực, bài viết, bình luận, và kết bạn.
- WebSocket (`socket.io`) cho nhắn tin thời gian thực.
- Xác thực dựa trên token (JWT hoặc tương tự).
- Hỗ trợ tải lên hình ảnh.

---

## 📂 Cấu Trúc Dự Án

```plaintext
src/
├── components/                     # Thành phần giao diện tái sử dụng
│   ├── Button/                    # Nút tùy chỉnh
│   │   └── Button.jsx
│   ├── Comment/                   # Thành phần bình luận
│   │   └── Comment.jsx
│   ├── Dialog/                    # Hộp thoại
│   │   ├── configs/
│   │   ├── LiveDialog.jsx
│   │   ├── NewPostDialog.jsx
│   │   └── index.jsx
│   ├── FormInputs/                # Trường nhập liệu biểu mẫu
│   │   ├── OTPInput.jsx
│   │   └── TextInput.jsx
│   ├── Friend/                    # Thành phần bạn bè
│   │   ├── FriendList/
│   │   │   ├── FriendList.jsx
│   │   │   └── FriendMessageItem.jsx
│   │   ├── FriendRequest/
│   │   │   ├── FriendRequest.jsx
│   │   │   └── FriendRequestItem.jsx
│   ├── Header/                    # Thanh điều hướng
│   │   └── Header.jsx
│   ├── Loading/                   # Hiệu ứng tải
│   │   └── Loading.jsx
│   ├── Post/                      # Thành phần bài viết
│   │   ├── Post.jsx
│   │   ├── PostCreation.jsx
│   │   ├── PostList.jsx
│   │   └── PostUserList.jsx
│   ├── Sidebar/                   # Thanh bên
│   │   └── Sidebar.jsx
│   ├── Story/                     # Thành phần câu chuyện
│   │   ├── StoryItem.jsx
│   │   ├── StoryList.jsx
│   │   ├── FormField.jsx
│   │   └── UserCard.jsx
├── configs/                       # Cấu hình
│   └── muiConfig.js               # Theme Material-UI
├── context/                       # Context API
│   ├── ModalProvider.jsx
│   └── SocketProvider.jsx
├── hooks/                         # Custom hooks
│   ├── useDetectLayout.jsx
│   ├── useInfiniteScroll.jsx
│   ├── useLazyLoadPosts.jsx
│   ├── useLazyLoadPostsByAuthor.jsx
│   ├── useLogout.jsx
│   ├── useTotalFriend.jsx
│   └── useUserInfo.jsx
├── layouts/                       # Layout
│   ├── AuthLayout.jsx
│   ├── ProtectedLayout.jsx
│   └── RootLayout.jsx
├── libs/                          # Thư viện tiện ích
│   ├── constant.js
│   └── utils.js
├── pages/                         # Các trang
│   ├── auth/                      # Trang xác thực
│   │   ├── ChangePasswordPage.jsx
│   │   ├── ForgotPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── OTPVerifyPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── ResetPassword.jsx
│   ├── HomePage.jsx
│   ├── MessagePage.jsx
│   ├── PostPage.jsx
│   ├── ProfilePage.jsx
│   └── SearchUsersPage.jsx
├── redux/                         # Redux store và slices
│   ├── slices/                    # Redux slices
│   │   ├── authSlice.js
│   │   ├── dialogSlice.js
│   │   ├── settingsSlice.js
│   │   └── snackbarSlice.js
│   ├── middleware.js              # Middleware tùy chỉnh
│   └── store.js                   # Cấu hình store
├── services/                      # Dịch vụ API
│   └── rootApi.js                 # RTK Query API
├── index.css                      # CSS toàn cục
├── main.jsx                       # Điểm vào ứng dụng
```
## ⚙️ Cài Đặt

### Yêu Cầu
- **Node.js**: Phiên bản 18 trở lên.
- **npm** hoặc **Yarn**.
- Máy chủ backend API (RESTful).
- Máy chủ WebSocket (cho nhắn tin thời gian thực).

### Hướng Dẫn
1. **Clone kho mã nguồn**:
   ```
   git clone https://github.com/tronghia26/Social-network.git
   cd Social-network
2. **Cài đặt phụ thuộc**:
   ```
   npm install
3. **Thiết lập biến môi trường: Tạo tệp .env trong thư mục gốc với nội dung**:
   ```
   VITE_BASE_URL=http://localhost:4010/api
4. **Chạy môi trường phát triển**:
   ```
   npm run dev
   ```
Ứng dụng sẽ chạy tại http://localhost:5173.
  
5. **Chạy môi trường phát triển**:
   ```
   npm run build
   ```
Tạo thư mục dist/ với tài nguyên tối ưu hóa.

6. **Kiểm tra và định dạng mã**
   
Kiểm tra mã:
   ```
   npm run lint
   ```
   
Định dạng mã:
   ```
   npx prettier --write .
   ```
7. **Xem trước ứng dụng production**:
   ```
   npm run preview

---

## 📖 Hướng Dẫn Sử Dụng
- **Đăng Ký & Đăng Nhập**
  - Truy cập /register để tạo tài khoản mới hoặc /login để đăng nhập.
  - Sử dụng /forgot-password để đặt lại mật khẩu nếu cần.
- **Tương Tác**
  - Tạo bài viết tại trang chủ (/).
  - Tìm kiếm người dùng tại /search/users.
  - Quản lý yêu cầu kết bạn trong mục "Friend Requests".
  - Xem hồ sơ cá nhân tại /users/:id.
  - Nhắn tin thời gian thực tại /messages.
- **Bài Viết**
  - Thích, bình luận hoặc tải lên hình ảnh cho bài viết.
  - Cuộn để tải thêm bài viết.
    
---

## 🌐 API Endpoints

**Dưới đây là các endpoint chính mà frontend tương tác (dựa trên RTK Query)**:
- **Xác Thực**
  - POST /signup: Đăng ký người dùng mới.
  - POST /login: Đăng nhập.
  - POST /forgot-password: Yêu cầu đặt lại mật khẩu.
  - POST /verify-otp: Xác minh OTP.
  - POST /reset-password: Đặt lại mật khẩu.
  - POST /change-password: Thay đổi mật khẩu.
  - POST /refresh-token: Làm mới token.
  - GET /auth-user: Lấy thông tin người dùng.
  - Bài Viết
  - POST /posts: Tạo bài viết.
  - GET /posts: Lấy danh sách bài viết (phân trang).
  - GET /posts/:id: Lấy bài viết theo ID.
  - GET /posts/author/:authorId: Lấy bài viết theo tác giả.
  - POST /posts/:id/like: Thích bài viết.
  - DELETE /posts/:id/like: Bỏ thích.
  - POST /posts/:id/comment: Thêm bình luận.
  - DELETE /posts/:id/comment/:commentId: Xóa bình luận.
- **Kết Bạn**
  - GET /search/users/:query: Tìm kiếm người dùng.
  - POST /friends/request: Gửi yêu cầu kết bạn.
  - GET /friends/pending: Lấy yêu cầu kết bạn đang chờ.
  - POST /friends/accept: Chấp nhận yêu cầu.
  - POST /friends/cancel: Hủy yêu cầu.
  - GET /friends: Lấy danh sách bạn bè.
- **Người Dùng**
  - GET /users/:id: Lấy thông tin người dùng theo ID.
 
---

## 📷 Ảnh Chụp Màn Hình
- **HomePage**
![image](https://github.com/user-attachments/assets/4915010b-939f-40fe-8524-1da141dc714f)
- **ProfilePage**
![image](https://github.com/user-attachments/assets/9bd145b5-ecfa-4357-aa17-d09f0ad53ced)
- **SearchUsersPage**
![image](https://github.com/user-attachments/assets/9f0ed5e1-8403-4270-a2a9-88fa262d277f)




---

## 📬 Liên Hệ
Email: lqtnghia2602@gmail.com
