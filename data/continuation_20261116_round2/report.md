# MagicSort — runtime continuation 20261116_round2

20 case, 87 ảnh mới trên15feature. Đây là subset actual được root review, không phải full UC pass. Snapshot43case/15/11, lượt16/11 ban đầu0runtime và workbook15/11 được giữ riêng.

[Full cases](../data/continuation_20261116_round2/cases.json) · [58 actionability](../data/continuation_20261116_round2/feature_actionability.json) · [Data index](../data/continuation_20261116_round2/data_index.json)

## MS-R16B-HOME01 — Vuốt thật qua Home, Leaderboard và Shop; kiểm biên trái

HomeUI · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build3129 xác minh hash APK; Home352, offline_existing_fixture, không popup chặn.

Steps: Vuốt từ (180,1000) tới (900,1000),650ms: Home sang Leaderboard. → Lặp lại: Leaderboard sang Shop. → Tại Shop, vuốt cùng hướng lần nữa để kiểm biên. → Vuốt ngược từ (900,1000) tới (180,1000),650ms hai lần: Shop qua Leaderboard về Home.

Expected: Trang và tab được chọn đồng bộ theo chiều kéo; không đi ra ngoài đầu danh sách; không bắt đầu level hoặc chi tiền.

Actual: Quan sát đủ Home → Leaderboard → Shop; kéo vượt đầu Shop vẫn ở Shop. Hai vuốt ngược trở về Home. Level352, coin và booster không đổi.

Limits: Chỉ ba trang và các drag650ms được quan sát. Không đo threshold0.2, tween timing, preload, nhánh Journey hoặc snapback drag ngắn.

Per-UC scope: {"UC-02":{"coverage":"observed_branch","scope":"Long swipe hai chiều và biên tại Store; không phải mọi gesture/variant."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_003_entry](../data/continuation_20261116_round2/assets/R16B_003_entry.png)

![R16B_004_swipe_right](../data/continuation_20261116_round2/assets/R16B_004_swipe_right.png)

![R16B_005_store_swipe](../data/continuation_20261116_round2/assets/R16B_005_store_swipe.png)

![R16B_012_store_boundary](../data/continuation_20261116_round2/assets/R16B_012_store_boundary.png)

![R16B_013_back_leaderboard](../data/continuation_20261116_round2/assets/R16B_013_back_leaderboard.png)

![R16B_014_home_return](../data/continuation_20261116_round2/assets/R16B_014_home_return.png)

## MS-R16B-STORE01 — Quét toàn bộ catalog Shop: 6 bundle và 6 gói coin, giá VND

Store · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Shop mở qua vuốt; không có checkout; mode offline_existing_fixture.

Steps: Đọc Starter và Apprentice ở đầu Shop. → Vuốt dọc lần lượt để thấy Magician, Sorcerer, Mage, Wizard. → Tiếp tục tới 6 gói coin rồi vuốt thêm để xác nhận cuối danh sách. → Thử chạm icon Undo của Starter; không thấy tooltip mở.

Expected: Catalog hiển thị đủ card, nhãn giá và phần thưởng; scroll tới cuối mà không mua hàng.

Actual: 6 bundle và6 gói coin được ghi nguyên theo UI trong store_catalog_observed.json. Giá VND vẫn hiển thị trong mode offline. Icon Undo được chạm không tạo overlay quan sát được. Cuối danh sách là hàng25k/50k/100k coin; vuốt thêm không lộ card khác. Số dư không đổi.

Limits: Chỉ catalog được cache/hiển thị ở tài khoản này; chưa kiểm receipt, store price refresh, checkout, grant hoặc quyền No Ads. Nhãn ADS không chứng minh entitlement sau mua. Không coi icon không mở tooltip là lỗi nếu chưa có requirement.

Per-UC scope: {"UC-02":{"coverage":"observed_branch","scope":"Duyệt12card tại một catalog offline; không phải IAP grant."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_005_store_swipe](../data/continuation_20261116_round2/assets/R16B_005_store_swipe.png)

![R16B_006_undo_tooltip](../data/continuation_20261116_round2/assets/R16B_006_undo_tooltip.png)

![R16B_008_shop_mid1](../data/continuation_20261116_round2/assets/R16B_008_shop_mid1.png)

![R16B_009_shop_mid2](../data/continuation_20261116_round2/assets/R16B_009_shop_mid2.png)

![R16B_010_shop_coins](../data/continuation_20261116_round2/assets/R16B_010_shop_coins.png)

![R16B_011_shop_bottom](../data/continuation_20261116_round2/assets/R16B_011_shop_bottom.png)

## MS-R16B-COLLECTION01 — Bonus Chest: preview ba rương, đóng tooltip và chạm giá100 khi có0 sao

Collection · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129 ARM64 đã được root xác minh hash APK; fixture hiện có ở Home352, Collection8/135. Gameplay UID được cô lập mạng theo session; root thực hiện thao tác, tác giả case chỉ đọc ảnh và safe ledger.

Steps: Mở Bonus Chest; đọc0 sao và ba mức giá100/250/500. → Chạm rương vàng để xem tooltip. Sau khi trở về từ support, chạm rương xanh lá và xanh dương để xem hai tooltip còn lại. → Chạm ngoài tooltip: tooltip mất, Bonus Chest vẫn mở. → Chạm nút giá100 khi You have0; chụp lại sau thao tác.

Expected: Có thể xem preview; thiếu sao không mở rương hoặc trao thưởng; chạm ngoài chỉ đóng tooltip.

Actual: Ba tooltip hiển thị phần thưởng và gói thẻ: vàng có hai booster icon×1 và gói nâu huy hiệu2; xanh lá có icon Shuffle×1 cùng gói nâu2/xanh dương3/xanh lá4; xanh dương có icon +chai×1 cùng gói xanh lá4/hồng5/navy New. Chạm ngoài làm tooltip mất. Sau khi root chạm100, popup vẫn0 sao và ba nút100/250/500 màu xám; không thấy animation mở/grant hoặc thông báo mới. InventoryModel trong safe ledger018→032 không đổi.

Limits: Chỉ nhánh thiếu sao và reward preview. Chưa có sao dư để kiểm spend, mở rương, grant, analytics hoặc RNG. Không suy màu/nhãn gói thành effective pack enum; preview không phải thưởng đã nhận. Lượt browser/support xen giữa thuộc case riêng; ledger endpoints không phải atomic transaction.

Per-UC scope: {"UC-06":{"coverage":"observed_branch","scope":"Preview ba rương, outside-dismiss và insufficient-stars0<100 không mở rương; chưa kiểm spend/grant hoặc mở thành công."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_018_bonus_chest](../data/continuation_20261116_round2/assets/R16B_018_bonus_chest.png)

![R16B_019_chest_preview_attempt](../data/continuation_20261116_round2/assets/R16B_019_chest_preview_attempt.png)

![R16B_029_green_chest_preview](../data/continuation_20261116_round2/assets/R16B_029_green_chest_preview.png)

![R16B_030_blue_chest_preview](../data/continuation_20261116_round2/assets/R16B_030_blue_chest_preview.png)

![R16B_031_toolbar_dismiss](../data/continuation_20261116_round2/assets/R16B_031_toolbar_dismiss.png)

![R16B_032_insufficient_stars](../data/continuation_20261116_round2/assets/R16B_032_insufficient_stars.png)

## MS-R16B-COLLECTION02 — Wonderland: badge2 và New mất sau khi xem theme rồi đóng/mở lại

Collection · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129 ARM64 đã được root xác minh hash APK; fixture hiện có ở Home352, Collection8/135. Gameplay UID được cô lập mạng theo session; root thực hiện thao tác, tác giả case chỉ đọc ảnh và safe ledger.

Steps: Ở Collection8/135, Wonderland2/9 có badge2. → Mở Wonderland: Festive Bulbs và Trash Bin đều2★, có nhãn New; theme2/9. → Chạm Festive Bulbs để xem card phóng to; chạm ngoài rồi chạm Cat Entrance chưa có để xem placeholder. → Chạm ngoài và đóng theme để trở về Collection. → Mở lại Wonderland trong cùng phiên; chưa restart app. → Sau các kiểm tra noncore, root force-stop chỉ MagicSort và khởi động lại, không ghi prefs; mở Collection072 sau Home071.

Expected: Sau xemtheme rồiđóng/mởlại, badgeNew đãxem biếnmất; sốthẻ/progresskhôngtăngvìkhôngmởpack.

Actual: Đầu lượt, Collection8/135 và Wonderland2/9 có badge2. Ảnh033 có New trên Festive Bulbs/Trash Bin. 034 phóng to Festive Bulbs vẫn có New tại thời điểm đó;035 là placeholder Cat Entrance. 036 trở về Collection vẫn8/135, Wonderland2/9 nhưng badge2 của Wonderland đã mất; Garden/Water Play vẫn có badge2. 037 mở lại Wonderland: cả Festive Bulbs/Trash Bin không còn New, theme vẫn2/9. InventoryModel trong safe ledger015→037 không đổi. Sau restart:071Home352;072Collection vẫn8/135,Wonderland2/9 không badge2, Garden/WaterPlay vẫnbadge2.

Limits: Đã kiểm qua đóng/mở popup và một force-stop/relaunch cùng fixture offline. Chưa resync/backend, chưa trích CardInventory.IsNewCard hoặc analytics; không suy ra mọi process kill/reset/account sync. Ảnh không phân định callback mark-seen cụ thể.

Per-UC scope: {"UC-12":{"coverage":"observed_branch","scope":"Wonderlandbadge/New mấtquađóng/mởpopup;badgeclearedcònquaforce-stop/relaunchmộtlần,progress8/135khôngđổi. Chưa backend/resync/analytics."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":true,"limitless_currency_dates_changed":true,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":true}

![R16B_015_collection_entry](../data/continuation_20261116_round2/assets/R16B_015_collection_entry.png)

![R16B_033_wonderland_entry](../data/continuation_20261116_round2/assets/R16B_033_wonderland_entry.png)

![R16B_034_owned_card](../data/continuation_20261116_round2/assets/R16B_034_owned_card.png)

![R16B_035_missing_card](../data/continuation_20261116_round2/assets/R16B_035_missing_card.png)

![R16B_036_theme_seen_return](../data/continuation_20261116_round2/assets/R16B_036_theme_seen_return.png)

![R16B_037_theme_reopened](../data/continuation_20261116_round2/assets/R16B_037_theme_reopened.png)

![R16B_071_restart_home](../data/continuation_20261116_round2/assets/R16B_071_restart_home.png)

![R16B_072_restart_collection_seen](../data/continuation_20261116_round2/assets/R16B_072_restart_collection_seen.png)

## MS-R16B-COLLECTION03 — Collection help và Learn More mở support chính thức trong Chrome rồi quay lại game

Collection · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129 ARM64 đã được root xác minh hash APK; fixture hiện có ở Home352, Collection8/135. Gameplay UID được cô lập mạng theo session; root thực hiện thao tác, tác giả case chỉ đọc ảnh và safe ledger.

Steps: Mở Collection info: đọc help ba bước và Tap to Continue; đóng help. → Trong Bonus Chest, từ preview chạm(i): More Information mời đọc rules/probabilities tại support page. → Bấm Learn More: Chrome mở trang Collection tại magic-sort-collection.grandgamesbe.com. Root cuộn qua Card Packs, bảng Initial Probability và ghi chú dynamic pool. → Dùng Android Back: quay lại game với popup Bonus Chest vẫn0 sao.

Expected: Đường dẫn trợ giúp mở trang support và có thể quay lại game. Đọc quy tắc công bố không được tính là mở pack hoặc kiểm RNG.

Actual: Help017 hiển thị ba bước kiếm pack/tích thẻ/hoàn thành set. More Information020 có Learn More;022 Chrome hiện Collection/Card Packs;023–027 hiện năm loại pack, bảng initial probability và ghi chú dynamic pool. Source fetch độc lập xác nhận đích HTTPS https://magic-sort-collection.grandgamesbe.com/ trả200. Android Back028 trở lại Bonus Chest0 sao; không thấy mở pack.

Limits: Đây là case quan sát informational navigation, uc=[] vì GDD không có UC help riêng; các pack UC chỉ related. Quy tắc và xác suất là published_official_rules, không phải empirical RNG, current effective config hay A/B assignment. Browser có mạng không chứng minh gameplay UID truy cập backend. Loại transient016/021 và splash001/002 khỏi curated images.

Per-UC scope: {}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_017_collection_info_full](../data/continuation_20261116_round2/assets/R16B_017_collection_info_full.png)

![R16B_020_card_probability](../data/continuation_20261116_round2/assets/R16B_020_card_probability.png)

![R16B_022_learn_more_result](../data/continuation_20261116_round2/assets/R16B_022_learn_more_result.png)

![R16B_023_support_scroll](../data/continuation_20261116_round2/assets/R16B_023_support_scroll.png)

![R16B_024_support_scroll](../data/continuation_20261116_round2/assets/R16B_024_support_scroll.png)

![R16B_025_support_scroll](../data/continuation_20261116_round2/assets/R16B_025_support_scroll.png)

![R16B_026_support_scroll](../data/continuation_20261116_round2/assets/R16B_026_support_scroll.png)

![R16B_027_support_scroll](../data/continuation_20261116_round2/assets/R16B_027_support_scroll.png)

![R16B_028_return_from_support](../data/continuation_20261116_round2/assets/R16B_028_return_from_support.png)

## MS-R16B-WEEKLY01 — Weekly Finished: xem bảng cache và dòng mình hạng9

WeeklyTournament · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: Mở Leaderboard; tab Weekly hiện bảng đã kết thúc. → Đọc podium, các dòng và dòng mình tô xanh.

Expected: Có thể đọc snapshot bảng đã cache; không xem thao tác xem là claim hoặc fetch mới.

Actual: Ảnh041: Weekly được chọn, nhãn Finished; dòng mình hạng9, điểm0, tô xanh. Bảng và podium hiện trong fixture offline.

Limits: Chưa refresh server, nhận thưởng, chuyển giải mới hoặc kiểm thay đổi hạng. Hạng/điểm là snapshot fixture; không đại diện live leaderboard.

Per-UC scope: {"UC-10":{"coverage":"observed_branch","scope":"Chỉ render cached finished standings và vị trí của mình; không claim/medalgrant/serverrefresh."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_041_leaderboard_tabs](../data/continuation_20261116_round2/assets/R16B_041_leaderboard_tabs.png)

## MS-R16B-LEADERBOARDS01 — Chuyển tab Friends/Players/Teams: cache và gate hiển thị

Leaderboards · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: Từ Weekly041 chạm Friends042. → Chạm Players043, World được chọn và đọc bảng cache/dòng mình. → Chạm Teams ranking044.

Expected: Các tab phản ánh đúng nội dung cache hoặc gate; không coi gate là tải thành công.

Actual: Friends042 hiện No Internet Connection. Players043 hiện World và danh sách cached gần hạng994–999; dòng mình ghim ở1000+, level352. Teams ranking044 có World/Country nhưng hiện Coming Soon!, không phải No Internet. Weekly041 có Finished/cache.

Limits: Không kiểm Country, fetch/refresh, Facebook, friend list hoặc team ranking data. UC06 chỉ entry No Internet; UC08 chỉ tab Weekly/cache; UC11 chỉ snapshot offline, chưa kiểm chính sách cache refresh.

Per-UC scope: {"UC-02":{"coverage":"observed_branch","scope":"World list cached có render; không fetch fresh."},"UC-04":{"coverage":"observed_branch","scope":"Dòng mình màu xanh ghim dưới World list ở1000+, level352."},"UC-06":{"coverage":"observed_branch","scope":"Chỉ tab Friends hiện No Internet, không danh sách bạn thành công."},"UC-08":{"coverage":"observed_branch","scope":"Weekly tab hiển thị cached Finished bảng; không lifecycle giải."},"UC-11":{"coverage":"observed_branch","scope":"Có cache ởWeekly/Players trong fixture offline, không chứng minh mọi bảng đều cache."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_041_leaderboard_tabs](../data/continuation_20261116_round2/assets/R16B_041_leaderboard_tabs.png)

![R16B_042_friends_entry](../data/continuation_20261116_round2/assets/R16B_042_friends_entry.png)

![R16B_043_players_gate](../data/continuation_20261116_round2/assets/R16B_043_players_gate.png)

![R16B_044_teams_ranking_gate](../data/continuation_20261116_round2/assets/R16B_044_teams_ranking_gate.png)

## MS-R16B-TEAMS01 — Teams entry và ranking hiển thị Coming Soon

Teams · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: Quan sát Teams ranking044. → Chạm tab Teams ở thanh dưới045.

Expected: Ghi nhận gate thực mà không suy khả năng join/create/chat.

Actual: 044 ở Leaderboard/Teams có Coming Soon. 045 màn Teams riêng có artwork và Coming Soon!, không có danh sách hoặc nút join.

Limits: Gate-only, uc=[]; chưa thực hiện suggestion, onboarding, join/create/chat/requests. Không suy Teams bị tắt toàn production từ một fixture.

Per-UC scope: {}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_044_teams_ranking_gate](../data/continuation_20261116_round2/assets/R16B_044_teams_ranking_gate.png)

![R16B_045_teams_entry](../data/continuation_20261116_round2/assets/R16B_045_teams_entry.png)

## MS-R16B-PROFILE01 — Đổi tên: blank/ab bị từ chối, abc mới là draft

Profile · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: Mở Profile047, Edit048, bấm pencil đổi tên049. → Xoá tên và bấm AndroidOK:050 input trống, Continue xám. → Chạm Continue051: thông báo cần ít nhất3validcharacters. → Nhậpab052: thông báo vẫn hiện. Nhậpabc053: Continue xanh. → Không submit abc; đóngX và sau đó đóng Edit.

Expected: Validation chặn tên ngắn; draft không tự đổi tên nếu không submit/save.

Actual: Blank050 có Continue xám; chạm051 tạo lỗi tối thiểu3validcharacters. ab052 vẫn input2ký tự và lỗi; abc053 có Continue xanh. Không bấm Continue khiabc. Profile058 sau đóng vẫn tên gốc.

Limits: Chỉ độ dài0/2/3 bằngASCII và cancel. Không kiểmmaxlen, Unicode, profanity, backendacceptance hoặc sync; không tínhabc là đổi tên thành công.

Per-UC scope: {"UC-02":{"coverage":"observed_branch","scope":"ValidationUI và cancel; không commit tên mới."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_047_profile_entry](../data/continuation_20261116_round2/assets/R16B_047_profile_entry.png)

![R16B_048_profile_edit](../data/continuation_20261116_round2/assets/R16B_048_profile_edit.png)

![R16B_049_rename_entry](../data/continuation_20261116_round2/assets/R16B_049_rename_entry.png)

![R16B_050_empty_name](../data/continuation_20261116_round2/assets/R16B_050_empty_name.png)

![R16B_051_empty_name_continue](../data/continuation_20261116_round2/assets/R16B_051_empty_name_continue.png)

![R16B_052_two_character_name](../data/continuation_20261116_round2/assets/R16B_052_two_character_name.png)

![R16B_053_three_character_draft](../data/continuation_20261116_round2/assets/R16B_053_three_character_draft.png)

![R16B_058_profile_cancel_result](../data/continuation_20261116_round2/assets/R16B_058_profile_cancel_result.png)

## MS-R16B-PROFILE02 — Chọn avatar khác trong draft rồi đóng Edit

Profile · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: Edit048 đang chọn avatar đầu hàng1. → Chạm avatar giữa hàng1:057 khung xanh/check chuyển sang lựa chọn mới. → Không bấmSave; đóngEdit→058.

Expected: Draft selection đổi, đóng không Save không thay avatar đã hiển thị trên Profile.

Actual: 057 check ởavatar giữa hàng1, nhưng preview header vẫnavatar gốc. 058 Profile vẫnavatar gốc như047.

Limits: Chỉ lựa chọn/cancel một avatar; chưa Save, persistence, sync hoặc mọiavatar/frame/namestyle.

Per-UC scope: {"UC-03":{"coverage":"observed_branch","scope":"Draft check thay đổi và cancelkhông Save; chưa trang bị avatar thành công."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_048_profile_edit](../data/continuation_20261116_round2/assets/R16B_048_profile_edit.png)

![R16B_057_avatar_draft](../data/continuation_20261116_round2/assets/R16B_057_avatar_draft.png)

![R16B_058_profile_cancel_result](../data/continuation_20261116_round2/assets/R16B_058_profile_cancel_result.png)

## MS-R16B-PROFILE03 — Token Wonderland bị khóa: preview và Equip bị từ chối

Profile · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: Mở tabToken054 thấy khóa trênWonderlandbadge. → Chạm icon055 để mởpreview. → Chạm Equip056.

Expected: Token chưa đủ điều kiện không được trang bị.

Actual: Token catalog054 có khóa. Preview055 làWonderlandBadge, Equip xám. Chạm056 hiện Token is not equippable; không có equipthànhcông.

Limits: Chỉ negativebranch với token khóa. Không kiểm nhận Collectiontoken, token đã unlock, Save hoặc sync. CollectionUC13 chỉ liên quan.

Per-UC scope: {"UC-05":{"coverage":"observed_branch","scope":"Lockedpreview/attemptedEquip bị chặn; không positiveequip."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_054_token_catalog](../data/continuation_20261116_round2/assets/R16B_054_token_catalog.png)

![R16B_055_locked_token](../data/continuation_20261116_round2/assets/R16B_055_locked_token.png)

![R16B_056_locked_equip_attempt](../data/continuation_20261116_round2/assets/R16B_056_locked_equip_attempt.png)

## MS-R16B-NOTIFICATIONS01 — ToggleON→OFF→ON: persistedflag và hủyUnityalarms

Notifications · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: Settings059NotificationsON. → ChạmOFF060 rồiON061; root lấy privateprefs/notification/alarm snapshots mỗi phase. → Sau các bước noncore, root force-stop chỉMagicSort rồi khởi động lại, không ghi prefs. → Sau restart, 073 làHome transition; 074 thực tế làSettingsNotificationsON mặc dù filename cócore.

Expected: UI/modeltoggle được lưu; OFF hủy lịch local được quan sát; ON không mặc nhiên chứng minh đã lên lịch/delivery.

Actual: UI059/060/061 lần lượt là ON/OFF/ON; NotificationModel.isNotificationOn trong bản allowlist là true/false/true. Alarm dumps có2 Unity notification alarms của game trước OFF,0 sau OFF và0 sau ON;1 alarm khác của game vẫn còn. Sau restart, private073 lưu flag=true; ảnh073 chỉ là Home transition, ảnh074 mới là Settings ON.

Limits: Chỉ fixture hiện tại; ảnh, prefs và dumps được lấy tuần tự, không atomic. Không công bố raw UID/intent/alarm IDs. Chưa kiểm OS permission dialog, delivery, remote push hoặc mọi send caller. Số0 sau ON chỉ mô tả snapshot đó, không khẳng định sẽ không có lịch mới về sau.

Per-UC scope: {"UC-02":{"coverage":"observed_branch","scope":"UI/modelON→OFF→ON, scheduledUnityalarm2→0→0 vàON cònsau restart; khôngdeliveryproof."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":true,"limitless_currency_dates_changed":true,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":true}

![R16B_059_settings_entry](../data/continuation_20261116_round2/assets/R16B_059_settings_entry.png)

![R16B_060_notifications_off](../data/continuation_20261116_round2/assets/R16B_060_notifications_off.png)

![R16B_061_notifications_on](../data/continuation_20261116_round2/assets/R16B_061_notifications_on.png)

![R16B_074_core352_entry](../data/continuation_20261116_round2/assets/R16B_074_core352_entry.png)

## MS-R16B-DUCK01 — Finishedrank45, rulesUI vàContinuebịNo Internet

DuckFestival · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: MởDuckFestival062: đọcFinished, rank45, rewarddash. → BấmInfo vàđọcfullhelp064:Normal×1/Hard×3/SuperHard×5; TaptoContinueđónghelp. → BấmContinue trênresult065.

Expected: Khi offline, ghi nhận resultcached vàgate Continue; không mặc định đã claim.

Actual: 062 bảngFinished córank45, điểm6, reward—. Help064 hiển thịmultiplier1/3/5. Continue065 hiệnNo InternetConnection trênbảngresult vẫn mở.

Limits: Không chơi levelđể kiểmduckmultiplier; helplàUIruleskhôngempiricalscoring. Chưa claim/rewardgrant/serverack/newinstance; negativeContinuekhông fullUC12pass.

Per-UC scope: {"UC-08":{"coverage":"observed_branch","scope":"Cachedfinishedranking render."},"UC-12":{"coverage":"observed_branch","scope":"Chỉ result vàattemptContinuebịnetworkgate; chưa claim/reset."},"UC-15":{"coverage":"observed_branch","scope":"OfflineContinue tạoNo Internet; chưarecovery/onlineack."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_062_duck_finished_entry](../data/continuation_20261116_round2/assets/R16B_062_duck_finished_entry.png)

![R16B_064_duck_rules_full](../data/continuation_20261116_round2/assets/R16B_064_duck_rules_full.png)

![R16B_065_duck_continue_result](../data/continuation_20261116_round2/assets/R16B_065_duck_continue_result.png)

## MS-R16B-BOAT01 — ChạmBoatFinishedởHomebịNo Internet

BoatRush · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: ĐóngDuckpopup bằngX để vềHome. → ChạmBoatRushFinishedicon theo rootaction rồi chụp066.

Expected: Networkgatekhông bị nhầm thành event đãmở/claim.

Actual: 066vẫnHome352, iconBoatFinishedhạng4 vàtoastNo InternetConnection. Không cóBoatpopup/raceviewmới.

Limits: Chỉ entrygate. Khôngxem thứhạng4 trênlobbyicon làđã xemtoàn race/đã claim; chưa fetch/join/reward/lives. Before065làDuckresult, endpointsbao gồmcloseDuckvàentryattempt.

Per-UC scope: {"UC-16":{"coverage":"observed_branch","scope":"Chỉ HomeentryattemptNo Internet; chưaeventofflinefallback/retry/sync."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_066_boat_finished](../data/continuation_20261116_round2/assets/R16B_066_boat_finished.png)

## MS-R16B-DAILY01 — Lịch tháng11: chạm ngày17/15 không đổi Play November16

DailyLevel · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Build0.0.3129ARM64 đã xác minh hash bởi root; Home352, offline_existing_fixture và gameplayUID cô lập mạng. Root thao tác; tác giả case chỉ đọc ảnh/safe ledger.

Steps: MởDailycalendar067. → ĐọcNovember2026, ngày16 chọn, progress0vàrewardmilestones. → Chạmngày tương lai17→068 rồingày trước15→069. KhôngbấmPlay.

Expected: Ghi nhậncalendarUIvàresponsecủahaitap; không suy disabled nếukhông có labelrõ.

Actual: 067 hiển thị November2026, ngày16 màu xanh và nút Play November16; thanh tháng ở0, Home entry trước đó là0/30. Preview mốc:3ngày100coin;7ngày30phút unlimited life;14ngày500coin;25ngày2500coin. Sau khi chạm17 rồi15,068/069 vẫn chọn16 và nút vẫn Play November16; không thấy overlay hoặc selection mới.

Limits: Chỉ calendar/reward preview và hai lần chạm không tạo thay đổi nhìn thấy. Chưa xác định nguyên nhân hoặc disabled predicate của các ô ngày. Không bấm Play, mở khóa, spend, win hoặc nhận mốc; UC09 chỉ là render preview.

Per-UC scope: {"UC-03":{"coverage":"observed_branch","scope":"RenderNovembercalendar vàcurrentselection; haiothertapsnoobservedchange."},"UC-09":{"coverage":"observed_branch","scope":"Progress0và4milestonepreviews; chưa đạt/claimmốc."}}

Ledger: {"currency_amount_delta_by_raw_type":{},"currency_amounts_unchanged":true,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":false,"level":352},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_067_daily_calendar](../data/continuation_20261116_round2/assets/R16B_067_daily_calendar.png)

![R16B_068_daily_future_day](../data/continuation_20261116_round2/assets/R16B_068_daily_future_day.png)

![R16B_069_daily_previous_day](../data/continuation_20261116_round2/assets/R16B_069_daily_previous_day.png)

## MS-R16B-CORE01 — Level352: full-target bị từ chối, đổ cyan3+1 và lộ màu ẩn

BottleSortMechanics · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Root thực hiện lượt level352 sau toàn bộ nhánh noncore; build0.0.3129ARM64, offline_existing_fixture, gameplayUID cô lập mạng. Dùng một Undo và một Extra Bottle từ kho fixture lớn; không ghi prefs.

Steps: Mở level352:12chai, sáu chai đầu phủ cloth có icon cyan; đánh số B1..B12 theo hai hàng trái→phải. → Thử B10→B8 tại077: B8 đang đầy, không thấy chuyển nước. → Đổ B8→B11 ba lớp cyan tại078; B10→B11 một lớp cyan tại079, chai cyan hoàn thành. → Tiếp tục chuỗi root đã ghi trong observations: các lớp Question Mark ở B1/B2/B3 lộ dần;091 không còn các ô ẩn cuối;092 chỉ còn nước đi xanh dương cuối.

Expected: Ghi nhận đúng nhánh thao tác và kết quả UI/ledger của một lượt fixture; không nâng thành full feature/UC pass.

Actual: 077 giữ bố cục/nước như trước, không phải ảnh uncover dù filename như vậy. 078 B11 có cyan ba lớp;079/080 B11 đầy cyan, có nút chai, sáu cloth mất. Ba chai B1/B2/B3 có các ô dấu hỏi sau uncover. Các chuỗi083/088/090/091 lần lượt lộ nâu, hồng, xanh lá và hai lớp cam cuối; các chai đồng màu có cap ở nhiều mốc. Danh sách nước đi và ảnh gốc được lưu riêng.

Limits: Một board runtime; chưa xác định seed/sourcefile của level352, không gán catalog identity theo số level. Không kiểm mọi transfer quantity, màu/sức chứa khác, stuck/lose, long bottle hoặc multi-collection. Các màu là tên nhìn từ UI, không numeric ColorId.

Per-UC scope: {"UC-03":{"coverage":"observed_branch","scope":"Full B8 không nhận nước; empty B11 và các đích cùng màu nhận nước trong chuỗi này."},"UC-04":{"coverage":"observed_branch","scope":"Cyan3 rồi cyan1 vào B11 theo quan sát UI/root actions; không đo nội bộ mọi quantity branch."},"UC-05":{"coverage":"observed_branch","scope":"Nhiều pour hợp lệ trong một lượt, ảnh chụp các checkpoint; không đo timing/input-lock."},"UC-06":{"coverage":"observed_branch","scope":"Một số chai đủ màu có cap, gồm cyan/red và các màu cuối; không generalize long-bottle rule."},"UC-11":{"coverage":"observed_branch","scope":"Ba chai có Question Mark lộ dần khi lấy nước phía trên; không kiểm Undo mọi hidden state."}}

Ledger: {"currency_amount_delta_by_raw_type":{"4":-1,"6":-1},"currency_amounts_unchanged":false,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":true,"level":352},"player_before":{"isLevelInProgress":true,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_076_level352_open](../data/continuation_20261116_round2/assets/R16B_076_level352_open.png)

![R16B_077_cyan_uncover](../data/continuation_20261116_round2/assets/R16B_077_cyan_uncover.png)

![R16B_078_cyan_three_to_empty](../data/continuation_20261116_round2/assets/R16B_078_cyan_three_to_empty.png)

![R16B_079_cyan_complete_uncover](../data/continuation_20261116_round2/assets/R16B_079_cyan_complete_uncover.png)

![R16B_080_uncovered_stable](../data/continuation_20261116_round2/assets/R16B_080_uncovered_stable.png)

![R16B_083_hidden_revealed](../data/continuation_20261116_round2/assets/R16B_083_hidden_revealed.png)

![R16B_086_red_complete_hidden_next](../data/continuation_20261116_round2/assets/R16B_086_red_complete_hidden_next.png)

![R16B_088_hidden_remaining](../data/continuation_20261116_round2/assets/R16B_088_hidden_remaining.png)

![R16B_089_four_colors_complete](../data/continuation_20261116_round2/assets/R16B_089_four_colors_complete.png)

![R16B_090_hidden_bottle2](../data/continuation_20261116_round2/assets/R16B_090_hidden_bottle2.png)

![R16B_091_last_hidden_exposed](../data/continuation_20261116_round2/assets/R16B_091_last_hidden_exposed.png)

![R16B_092_before_winning_move](../data/continuation_20261116_round2/assets/R16B_092_before_winning_move.png)

## MS-R16B-OBSTACLES01 — Curtain/Question Mark/Generator và cloth không phục hồi sau Undo

Obstacles · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Root thực hiện lượt level352 sau toàn bộ nhánh noncore; build0.0.3129ARM64, offline_existing_fixture, gameplayUID cô lập mạng. Dùng một Undo và một Extra Bottle từ kho fixture lớn; không ghi prefs.

Steps: Cyan hoàn thành tại079/080 làm sáu cloth cùng icon cyan biến mất. → Dùng Undo081: cyan một lớp trở lại B10, B11 mất cap; sáu cloth vẫn không trở lại. Đổ lại bằng thao tác thường082. → Sau Extra Bottle, B12 generator đổ pink vào B13 tại085: hiện blue và counter1. → Đổ blue từ B12 sang B9 trong nhóm087: grey xuất hiện, counter/base không còn; đổ grey sang B3 ở088 làm chai mini trống. → Theo dõi các ô dấu hỏi ở B1/B2/B3 lộ màu qua083/088/090/091.

Expected: Ghi nhận đúng nhánh thao tác và kết quả UI/ledger của một lượt fixture; không nâng thành full feature/UC pass.

Actual: Ảnh076 có sáu cloth. 080 không còn cloth;081 Undo phục hồi nước/cap nhưng không phục hồi cloth,082 đổ lại không tái che. Generator bắt đầu pink/counter2;085 blue/counter1;087 grey và mất nhãn/base counter;088 chai mini trống. Hidden cells lộ dần.

Limits: Chỉ ba họ vật cản trên một fixture. Cloth không phục hồi là hành vi quan sát, chưa phân loại lỗi nếu chưa có requirement. Không suy counter label bằng internal state hoặc capacity từ ảnh. Chưa kiểm Undo generator/hidden, mọi blocker, intro hoặc booster khác.

Per-UC scope: {"UC-01":{"coverage":"observed_branch","scope":"Các Question Mark của ba chai lộ trong chuỗi đã ghi."},"UC-02":{"coverage":"observed_branch","scope":"Sáu cloth cùng cyan icon mất sau hoàn thành cyan."},"UC-12":{"coverage":"observed_branch","scope":"Pink→blue→grey và counter2→1→nhãn mất; không xác minh source config/color queue IDs."},"UC-26":{"coverage":"observed_branch","scope":"Một Undo sau cloth removal không tái che, dù nước quay lại; không kiểm mọi tương tác."}}

Ledger: {"currency_amount_delta_by_raw_type":{"4":-1,"6":-1},"currency_amounts_unchanged":false,"life_fill_date_changed":false,"limitless_currency_dates_changed":false,"player_after":{"isLevelInProgress":true,"level":352},"player_before":{"isLevelInProgress":true,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":false}

![R16B_076_level352_open](../data/continuation_20261116_round2/assets/R16B_076_level352_open.png)

![R16B_080_uncovered_stable](../data/continuation_20261116_round2/assets/R16B_080_uncovered_stable.png)

![R16B_081_undo_after_uncover](../data/continuation_20261116_round2/assets/R16B_081_undo_after_uncover.png)

![R16B_082_redo_cyan_no_recloth](../data/continuation_20261116_round2/assets/R16B_082_redo_cyan_no_recloth.png)

![R16B_083_hidden_revealed](../data/continuation_20261116_round2/assets/R16B_083_hidden_revealed.png)

![R16B_085_generator_first_emit](../data/continuation_20261116_round2/assets/R16B_085_generator_first_emit.png)

![R16B_087_generator_final_emit](../data/continuation_20261116_round2/assets/R16B_087_generator_final_emit.png)

![R16B_088_hidden_remaining](../data/continuation_20261116_round2/assets/R16B_088_hidden_remaining.png)

![R16B_090_hidden_bottle2](../data/continuation_20261116_round2/assets/R16B_090_hidden_bottle2.png)

![R16B_091_last_hidden_exposed](../data/continuation_20261116_round2/assets/R16B_091_last_hidden_exposed.png)

## MS-R16B-BOOSTERS01 — Undo và Extra Bottle mỗi loại tiêu đúng một trong lượt352

Boosters · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Root thực hiện lượt level352 sau toàn bộ nhánh noncore; build0.0.3129ARM64, offline_existing_fixture, gameplayUID cô lập mạng. Dùng một Undo và một Extra Bottle từ kho fixture lớn; không ghi prefs.

Steps: Ở080, Undo UI/ledger9998 và Extra Bottle9988. → Chạm Undo081: số Undo còn9997; nước cyan quay lại B10/B11 mất cap. → Lặp lại B10→B11 bằng tap thường082, không phải gọi Redo nội bộ. → Chạm Extra Bottle084: chai mới B13 xuất hiện, layout từ12 thành13; Extra Bottle còn9987.

Expected: Ghi nhận đúng nhánh thao tác và kết quả UI/ledger của một lượt fixture; không nâng thành full feature/UC pass.

Actual: Safe ledger080→081 currency4 giảm9998→9997; UI trùng mức giảm1. Safe ledger083→084 currency6 giảm9988→9987, ảnh có chai mới rỗng. Shuffle currency5 giữ9997. Hai booster balances vẫn9997/9987 ở Home100 sau thắng và restart.

Limits: Kho fixture rất lớn, không đại diện new-player economy. Chưa mua booster, hết hàng, affordability, SDK ads, server sync hoặc dùng khi animation đang chạy. Không kiểm mọi Undo state; cloth không phục hồi được ghi riêng ở Obstacles.

Per-UC scope: {"UC-02":{"coverage":"observed_branch","scope":"Một Undo phục hồi last pour và tiêu1; không toàn bộ history/blocker rollback."},"UC-05":{"coverage":"observed_branch","scope":"Một Extra Bottle thêm chai rỗng và tiêu1; không kiểm giới hạn tối đa/offer khi hết hàng."}}

Ledger: {"currency_amount_delta_by_raw_type":{"1":20,"4":-1,"6":-1},"currency_amounts_unchanged":false,"life_fill_date_changed":true,"limitless_currency_dates_changed":true,"player_after":{"isLevelInProgress":false,"level":353},"player_before":{"isLevelInProgress":true,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":true}

![R16B_080_uncovered_stable](../data/continuation_20261116_round2/assets/R16B_080_uncovered_stable.png)

![R16B_081_undo_after_uncover](../data/continuation_20261116_round2/assets/R16B_081_undo_after_uncover.png)

![R16B_082_redo_cyan_no_recloth](../data/continuation_20261116_round2/assets/R16B_082_redo_cyan_no_recloth.png)

![R16B_084_extra_bottle](../data/continuation_20261116_round2/assets/R16B_084_extra_bottle.png)

![R16B_085_generator_first_emit](../data/continuation_20261116_round2/assets/R16B_085_generator_first_emit.png)

![R16B_100_final_restart_home](../data/continuation_20261116_round2/assets/R16B_100_final_restart_home.png)

## MS-R16B-LEVELFLOW01 — Thắng352→353, thưởng20 sau Continue, Boat→Duck→Home và restart

LevelFlow · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Root thực hiện lượt level352 sau toàn bộ nhánh noncore; build0.0.3129ARM64, offline_existing_fixture, gameplayUID cô lập mạng. Dùng một Undo và một Extra Bottle từ kho fixture lớn; không ghi prefs.

Steps: Home075 hiển thị352; root bấm Play để mở board076. → Sau chuỗi solve, B2→B9 tại093 là nước đi thắng;094 popup Level352 PERFECT thưởng20. → Bấm Continue:095 thực tế là Boat Rush Finished result, không phải Home như filename. → Mở/đóng Boat info097 rồi Boat Continue:098 là Duck Festival Finished. Đóng Duck bằngX:099 Home353. → Root force-stop/relaunch chỉ MagicSort;100 vẫn Home353 và số dư cuối.

Expected: Ghi nhận đúng nhánh thao tác và kết quả UI/ledger của một lượt fixture; không nâng thành full feature/UC pass.

Actual: PlayerModel075 level352/inProgressfalse;076 true;093/094 level353/inProgressfalse. 094 popup20 nhưng coin vẫn999994989. Sau Continue,095 coin đã999995009 (+20), giữ tới099/100; credit window là094→095, không đợi đến Home. Queue nhìn thấy là win popup→Boat Finished→Duck Finished→Home353. Home100 sau cold restart vẫn353, coin999995009,5livesUI, Undo9997/Shuffle9997/Extra9987.

Limits: Một win branch trong fixture offline; PERFECT là label UI, không suy không dùng booster. Chưa kiểm full command queue, skippable rules, analytics, backend ack, lose/PlayOn hoặc reward duplication qua nhiều lần restart. Popup của event khác là cached navigation, không chứng minh backend claim của Boat/Duck.

Per-UC scope: {"UC-01":{"coverage":"observed_branch","scope":"Home352→board352 và inProgressfalse→true một lần."},"UC-11":{"coverage":"observed_branch","scope":"Một thắng thực, popup20 và Player353; coincredit chốt bằng ledger094→095."},"UC-14":{"coverage":"observed_branch","scope":"Observed queue Boat→Duck→Home và một restart; không toàn bộ57commands/variant."}}

Ledger: {"currency_amount_delta_by_raw_type":{"1":20,"4":-1,"6":-1},"currency_amounts_unchanged":false,"life_fill_date_changed":true,"limitless_currency_dates_changed":true,"player_after":{"isLevelInProgress":false,"level":353},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":true}

![R16B_075_before_core_home](../data/continuation_20261116_round2/assets/R16B_075_before_core_home.png)

![R16B_076_level352_open](../data/continuation_20261116_round2/assets/R16B_076_level352_open.png)

![R16B_092_before_winning_move](../data/continuation_20261116_round2/assets/R16B_092_before_winning_move.png)

![R16B_093_win_transition](../data/continuation_20261116_round2/assets/R16B_093_win_transition.png)

![R16B_094_win_result_stable](../data/continuation_20261116_round2/assets/R16B_094_win_result_stable.png)

![R16B_095_postwin_home353](../data/continuation_20261116_round2/assets/R16B_095_postwin_home353.png)

![R16B_098_boat_continue_afterwin](../data/continuation_20261116_round2/assets/R16B_098_boat_continue_afterwin.png)

![R16B_099_home353_stable](../data/continuation_20261116_round2/assets/R16B_099_home353_stable.png)

![R16B_100_final_restart_home](../data/continuation_20261116_round2/assets/R16B_100_final_restart_home.png)

## MS-R16B-BOAT02 — Post-win mở được cached Finished race và info dù direct entry trước đó bị mạng

BoatRush · observed_partial · build0.0.3129 ARM64 · offline_existing_fixture

Precondition: Root thực hiện lượt level352 sau toàn bộ nhánh noncore; build0.0.3129ARM64, offline_existing_fixture, gameplayUID cô lập mạng. Dùng một Undo và một Extra Bottle từ kho fixture lớn; không ghi prefs.

Steps: So với entry066 ở Home chỉ tạo No Internet toast, sau thắng Continue094 mở Boat095. → Đọc Finished, Stage1/4, own boat score1 và các dòng đối thủ/claimed-place labels. → MởInfo và chụp fullhelp097; Tap to Continue đóng help. → Boat Continue chuyển sang Duck098; không mở event reward chest.

Expected: Ghi nhận đúng nhánh thao tác và kết quả UI/ledger của một lượt fixture; không nâng thành full feature/UC pass.

Actual: 095 có Finished và Stage1/4/Race is over, own boat1; có hai dòng đối thủ ghi1st/2nd place claimed. 097 help nói beat levels, finish race, advance stages, rewards. 098 chuyển Duck result. Đây là branch post-win khác direct entry066, không phải Home095.

Limits: Chỉ cached result/Info và queue advancement. Không nhận thưởng Boat, join/fetch race mới, stage progress grant, unlimited life hoặc online result ack. Những claimed-place labels thuộc UI đối thủ, không là claim của tài khoản này.

Per-UC scope: {"UC-10":{"coverage":"observed_branch","scope":"Xem các dòng đối thủ và ownscore trên Finished race snapshot."},"UC-12":{"coverage":"observed_branch","scope":"ManualInfo/help render và đóng; không first-intro trigger."}}

Ledger: {"currency_amount_delta_by_raw_type":{"1":20,"4":-1,"6":-1},"currency_amounts_unchanged":false,"life_fill_date_changed":true,"limitless_currency_dates_changed":true,"player_after":{"isLevelInProgress":false,"level":353},"player_before":{"isLevelInProgress":false,"level":352},"scope":"Amount equality is not whole-inventory equality; timed/life fields and other event models are separate. Raw currency IDs are not assigned names from a different build.","timed_currency_dates_changed":true}

![R16B_066_boat_finished](../data/continuation_20261116_round2/assets/R16B_066_boat_finished.png)

![R16B_095_postwin_home353](../data/continuation_20261116_round2/assets/R16B_095_postwin_home353.png)

![R16B_097_boat_rules_full](../data/continuation_20261116_round2/assets/R16B_097_boat_rules_full.png)

![R16B_098_boat_continue_afterwin](../data/continuation_20261116_round2/assets/R16B_098_boat_continue_afterwin.png)
