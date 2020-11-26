var express = require('express');
var router = express.Router();

const mypageController = require('../controller/mypageController');
const Mypage = new mypageController();

// 마이페이지 메인화면 렌더링(페인팅 오더 목록)
router.get('/', Mypage.getOrderList,function (req, res, next) {
    res.render('mypage/mypage_main', {
        name: req.session.user.name, company:req.session.user.company_num, orderList:req.orderList
    });
})

// 마이페이지 커스텀 오더 목록 렌더링
router.get('/custom_order', function (req, res, next) {
    res.render('mypage/mypage_custom_order', {
        name: req.session.user.name, company:req.session.user.company_num
    })
})

// 마이페이지 사용자 카드 목록 렌더링
router.get('/myCard', Mypage.getCard,function (req, res, next) {
    res.render('mypage/mypage_myCard', {
        name: req.session.user.name,
        card:req.card, company:req.session.user.company_num
    })
})

// 마이페이지 사용자 배송지목록 렌더링
router.get('/myAdr', Mypage.getAddress,function (req, res, next) {
    res.render('mypage/mypage_myAdress', {
        name: req.session.user.name,
        address: req.address, company:req.session.user.company_num
    })
})

// 마이페이지 사용자가 적은 리뷰 목록 렌더링
router.get('/reviewList', function (req, res, next) {
    res.render('mypage/mypage_reviewList', {
        name: req.session.user.name, company:req.session.user.company_num
    })
})

// 마이페이지 주소 추가 페이지 렌더링
router.get('/addAdr', function (req, res, next) {
    res.render('mypage/add/mypage_Adress_add', {
        name: req.session.user.name, company:req.session.user.company_num
    })
})

// 마이페이지 카드 추가 페이지 렌더링
router.get('/addCard', function(req, res, next){
    res.render('mypage/add/mypage_Card_add', {
        name: req.session.user.name, company:req.session.user.company_num
    })
})

// 마이페이지 카드 정보 수정 페이지 렌더링
router.get('/updateCard/:card_num', Mypage.getTagetCard,function(req, res, next){
    res.render('mypage/update/mypage_card_update', {name:req.session.user.name, company:req.session.user.company_num, card:req.tagetCard})
})

// 마이페이지 배송지 정보 수정 페이지 렌더링
router.get('/updateAddress/:adr_UID', Mypage.getTagetAddress,function(req, res, next){
    res.render('mypage/update/mypage_address_update', {name:req.session.user.name, company:req.session.user.company_num, address:req.tagetAddress})
})

// 배송지 추가 post
router.post('/addAdr', Mypage.addAddress, function (req, res, next) {

    res.send(`<script type="text/javascript">
            alert("배송지 추가 성공"); 
            location.href='/mypage/myAdr';
            </script>`)
})

// 카드 추가 post
router.post('/addCard',Mypage.addCard,function(req,res,next){
    res.send(`<script type="text/javascript">
            alert("결제카드 추가 성공"); 
            location.href='/mypage/myCard';
            </script>`)
})

// 카드 업데이트 post
router.post('/updateCard/:card_num', function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("카드 수정 성공"); 
            location.href='/mypage/myㅊㅁㄱ';
            </script>`)
})

// 배송지 업데이트 post
router.post('/updateAddress/:adr_uid', function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("배송지 수정 성공"); 
            location.href='/mypage/myAdr';
            </script>`)
})

// 배송지 삭제 post
router.post('/deleteAddress/:adr_num', Mypage.deleteAddress,function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("배송지 삭제 성공"); 
            location.href='/mypage/myAdr';
            </script>`)
})

// 카드 삭제 post
router.post('/deleteCard/:card_num', Mypage.deleteCard,function(req, res, next){
    res.send(`<script type="text/javascript">
            alert("결제카드 삭제 성공"); 
            location.href='/mypage/myCard';
            </script>`)
})
module.exports = router;