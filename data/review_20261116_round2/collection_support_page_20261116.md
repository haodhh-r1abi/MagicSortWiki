# Collection: luật công bố và dữ liệu đóng gói

Nguồn chính thức: https://magic-sort-collection.grandgamesbe.com/ . Đã GET HTML và JavaScript được HTML tham chiếu bằng urllib; web tool không truy cập được. HTML trả200 nhưng chỉ là shell SPA. Nội dung công bố lấy từ dữ liệu trong bundle JS, có URL, timestamp và SHA256 trong JSON. Không tải media.

Có đủ năm loại gói và sáu hàng xác suất ban đầu. Brown/Blue/Green lần lượt có 2/3/4 thẻ. Pink có 5 thẻ và ít nhất một thẻ từ 3 sao; cơ chế missing-card boost nêu 50% ở gói thứ hai và bảo đảm ở gói thứ ba nếu những gói trước vẫn chưa cho thẻ còn thiếu. Navy có 6 thẻ, bảo đảm một thẻ còn thiếu và ưu tiên missing Gold, rồi chọn trong nhóm missing có sao cao nhất.

Xác suất ban đầu được trang công bố:1 sao 35.8%,2 sao 23.6%,3 sao 17.9%,4 sao 9.7%,5 sao 8.1%,Gold 4.9%; tổng 100%. Đây là luật công bố, không phải kết quả đo RNG hoặc effective config của phiên hiện tại.

Phép tính độc lập từ số thẻ và default CardMultipliers của collection_4/5 cho 4 sao khoảng 10.3%,5 sao khoảng 7.6%. Vì vậy không dùng bảng website thay thế config client. JSON giữ toàn bộ count, weighted count, tổng 2952 và phần trăm đầy đủ cho cả ba resource, không chỉ hai hàng khác biệt. Lý do chênh lệch và config có hiệu lực chưa được xác định.

File dữ liệu chính: collection_support_page_20261116.json. Raw React bundle chỉ lưu ở outputs/review_20261116/private_source_support và không đưa vào web. Last-Modified của bundle là 04/09/2025; fetch mới không có nghĩa nội dung mới được xuất bản. Dữ liệu nguồn tĩnh này không thay đổi tám patch đã freeze.
