<h1>Recipe</h1>

Bu proje, yemek tariflerini oluşturmanıza, görüntülemenize ve düzenlemenize olanak tanıyan bir yemek tarifleri uygulamasıdır. Proje iki ana kısımdan oluşmaktadır: API ve client (istemci).

<h2>Proje Yapısı</h2>

API
Client

<h2>Kullanım</h2>

Uygulamanın ana sayfasında mevcut tarifleri arayabilir ve listeleyebilirsiniz.
Yeni bir tarif oluşturmak için "Oluştur" sayfasını kullanabilirsiniz.
Bir tarifi detaylı olarak görüntülemek ve düzenlemek için tarif kartına tıklayabilirsiniz.
Tarifleri süresine göre sıralayabilirsiniz.

<h2>Proje Yapısı</h2>

API
API kısmı, tarif verilerini yönetmek için kullanılır ve Node.js tabanlı bir sunucu ile çalışır.

server.js: Sunucunun ana dosyasıdır. Sunucuyu başlatır ve gerekli rotaları tanımlar.
data/db.json: JSON sunucusunun veritabanı dosyasıdır.
routes/recipes.js: Tarif rotalarını tanımlar (GET, POST, DELETE).

Client
Client kısmı, kullanıcı arayüzünü sağlar ve React ile geliştirilmiştir.

src: Tüm kaynak kodların bulunduğu dizin.
components: Uygulama bileşenleri.
pages: Uygulama sayfaları.
utils: Yardımcı fonksiyonlar ve API istemcisi.
App.jsx: Uygulamanın ana bileşeni.
index.js: Uygulamanın giriş noktası.
Özellikler
Tarifleri listeleme, arama ve sıralama.
Yeni tarif oluşturma.
Tarif detaylarını görüntüleme ve silme.
Kullanıcı dostu arayüz ve duyarlı tasarım.
API ile veri yönetimi.

<h2>Kütüphaneler ve Araçlar</h2>

Backend (API):

Node.js
JSON Server

Frontend (Client):

React
react-router-dom
react-query
react-icons
react-toastify
axios

<h2>Ekran Görüntüsü</h2>

![](./public/recipe_backend.gif)
