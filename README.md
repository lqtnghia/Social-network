WeConnect App
 <!-- Thay bằng logo thực tế nếu có -->

WeConnect App là một ứng dụng mạng xã hội hiện đại, cho phép người dùng kết nối, chia sẻ bài viết, nhắn tin thời gian thực và quản lý quan hệ bạn bè. Được xây dựng với React, Redux Toolkit, Material-UI, và TailwindCSS, ứng dụng mang đến trải nghiệm mượt mà và giao diện responsive. Backend sử dụng API RESTful và WebSocket để hỗ trợ các tính năng tương tác thời gian thực.

🚀 Tính Năng
Xác Thực & Phân Quyền:
Đăng ký, đăng nhập bằng email và mật khẩu.
Quên mật khẩu với xác minh OTP.
Thay đổi mật khẩu cho tài khoản đã đăng nhập.
Xác thực token với cơ chế làm mới token.
Bài Viết:
Tạo bài viết với văn bản và hình ảnh (tải lên qua react-dropzone).
Thích và bình luận bài viết với cập nhật lạc quan.
Cuộn vô hạn để tải thêm bài viết.
Hệ Thống Kết Bạn:
Tìm kiếm người dùng và gửi yêu cầu kết bạn.
Chấp nhận hoặc hủy yêu cầu kết bạn.
Xem danh sách bạn bè và bắt đầu nhắn tin.
Nhắn Tin:
Nhắn tin thời gian thực với bạn bè qua socket.io-client.
Giao diện nhắn tin thân thiện, hỗ trợ thông báo.
Xác Thực Biểu Mẫu:
Sử dụng react-hook-form và yup để quản lý và xác thực biểu mẫu.
Giao Diện:
Thiết kế responsive với Material-UI và TailwindCSS.
Hiệu ứng động mượt mà nhờ Framer Motion.
Font chữ tùy chỉnh với @fontsource-variable/public-sans.
🛠 Công Nghệ Sử Dụng
Frontend
React v19: Xây dựng giao diện người dùng.
Redux Toolkit: Quản lý trạng thái và tương tác API với RTK Query.
Material-UI: Thành phần giao diện responsive.
TailwindCSS: Tiện ích CSS để tùy chỉnh giao diện.
React Router: Điều hướng phía client.
Socket.IO Client: Nhắn tin thời gian thực.
React Hook Form & Yup: Xác thực biểu mẫu.
React Dropzone: Tải lên hình ảnh.
Framer Motion: Hiệu ứng động.
Redux Persist: Lưu trữ trạng thái qua các lần tải trang.
Day.js: Định dạng ngày giờ.
React Toastify: Thông báo người dùng.
Lodash: Thư viện tiện ích.
Công Cụ Phát Triển
Vite: Công cụ build nhanh.
ESLint: Kiểm tra mã nguồn.
Prettier: Định dạng mã, hỗ trợ TailwindCSS.
PostCSS & Autoprefixer: Tăng khả năng tương thích CSS.
Backend (Giả định)
API RESTful cho xác thực, bài viết, bình luận, và kết bạn.
WebSocket (socket.io) cho nhắn tin thời gian thực.
Token-based authentication (JWT hoặc tương tự).
Hỗ trợ tải lên hình ảnh.
📂 Cấu Trúc Dự Án
plaintext

Copy
src/
├── components/             # Thành phần giao diện tái sử dụng
│   ├── Button/
│   ├── Comment/
│   ├── Dialog/
│   ├── FormInputs/
│   ├── Friend/
│   ├── Header/
│   ├── Loading/
│   ├── Post/
│   ├── Sidebar/
│   ├── Story/
│   └── UserCard/
├── configs/                # Cấu hình (MUI theme, TailwindCSS)
├── layouts/                # Layout (Root, Auth, Protected)
├── pages/                  # Trang (Home, Profile, Auth, ...)
├── redux/                  # Redux store và slices
│   ├── slices/            # Slice (auth, snackbar, settings, dialog)
│   └── store.js           # Cấu hình Redux store
├── services/               # Dịch vụ API (RTK Query)
└── index.jsx               # Điểm vào ứng dụng
⚙️ Cài Đặt
Yêu Cầu
Node.js: v18 trở lên.
npm hoặc Yarn.
Máy chủ backend API (RESTful).
Máy chủ WebSocket (cho nhắn tin thời gian thực).
Hướng Dẫn
Clone kho mã nguồn:
bash

Copy
git clone https://github.com/<your-username>/weconnect-app.git
cd weconnect-app
Cài đặt phụ thuộc:
bash

Copy
npm install
Thiết lập biến môi trường: Tạo tệp .env trong thư mục gốc với nội dung:
plaintext

Copy
VITE_BASE_URL=<your-backend-api-url>
VITE_WEBSOCKET_URL=<your-websocket-url>
Chạy môi trường phát triển:
bash

Copy
npm run dev
Ứng dụng sẽ chạy tại http://localhost:5173.
Build cho production:
bash

Copy
npm run build
Tạo thư mục dist/ với tài nguyên tối ưu hóa.
Kiểm tra và định dạng mã:
Kiểm tra mã:
bash

Copy
npm run lint
Định dạng mã:
bash

Copy
npx prettier --write .
Xem trước ứng dụng production:
bash

Copy
npm run preview
📖 Hướng Dẫn Sử Dụng
Đăng Ký & Đăng Nhập:
Truy cập /register để tạo tài khoản hoặc /login để đăng nhập.
Sử dụng /forgot-password để đặt lại mật khẩu nếu cần.
Tương Tác:
Tạo bài viết tại trang chủ (/).
Tìm kiếm người dùng tại /search/users.
Quản lý yêu cầu kết bạn trong mục "Friend Requests".
Xem hồ sơ cá nhân tại /users/:id.
Nhắn tin thời gian thực tại /messages.
Bài Viết:
Thích, bình luận hoặc tải lên hình ảnh cho bài viết.
Cuộn để tải thêm bài viết.
🌐 API Endpoints
Dưới đây là các endpoint chính mà frontend tương tác (dựa trên RTK Query):

Xác Thực
POST /signup: Đăng ký người dùng mới.
POST /login: Đăng nhập.
POST /forgot-password: Yêu cầu đặt lại mật khẩu.
POST /verify-otp: Xác minh OTP.
POST /reset-password: Đặt lại mật khẩu.
POST /change-password: Thay đổi mật khẩu.
POST /refresh-token: Làm mới token.
GET /auth-user: Lấy thông tin người dùng.
Bài Viết
POST /posts: Tạo bài viết.
GET /posts: Lấy danh sách bài viết (phân trang).
GET /posts/:id: Lấy bài viết theo ID.
GET /posts/author/:authorId: Lấy bài viết theo tác giả.
POST /posts/:id/like: Thích bài viết.
DELETE /posts/:id/like: Bỏ thích.
POST /posts/:id/comment: Thêm bình luận.
DELETE /posts/:id/comment/:commentId: Xóa bình luận.
Kết Bạn
GET /search/users/:query: Tìm kiếm người dùng.
POST /friends/request: Gửi yêu cầu kết bạn.
GET /friends/pending: Lấy yêu cầu kết bạn đang chờ.
POST /friends/accept: Chấp nhận yêu cầu.
POST /friends/cancel: Hủy yêu cầu.
GET /friends: Lấy danh sách bạn bè.
Người Dùng
GET /users/:id: Lấy thông tin người dùng theo ID.
🤝 Đóng Góp
Fork kho mã nguồn.
Tạo nhánh mới:
bash

Copy
git checkout -b feature/<tinh-nang-cua-ban>
Commit thay đổi:
bash

Copy
git commit -m "Thêm <tính năng>"
Đẩy lên nhánh:
bash

Copy
git push origin feature/<tinh-nang-cua-ban>
Mở pull request trên GitHub.
📜 Giấy Phép
Dự án được cấp phép theo .

📬 Liên Hệ
Email: your-email@example.com
GitHub Issues: Mở issue tại kho mã nguồn
Cảm ơn bạn đã khám phá WeConnect App! Hãy kết nối và chia sẻ những khoảnh khắc tuyệt vời! 🌟
