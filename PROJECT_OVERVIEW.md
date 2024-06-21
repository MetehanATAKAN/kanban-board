# Proje Özeti: Kanban Board Uygulaması

Bu doküman, Kanban Board projesinin amaçlarını, anladığım detayları ve projeyi geliştirmek için izlenen adımları içermektedir.

## Proje Amacı

Bu proje, kullanıcıların görevlerini organize etmelerini sağlayan bir Kanban Board uygulaması geliştirmeyi amaçlamaktadır. Uygulama, kullanıcıların görevleri oluşturmasına, düzenlemesine, silmesine ve sürükle-bırak yöntemiyle farklı durumlara (Backlog, To Do, In Progress, Done vb.) taşımalarına olanak tanır. Ayrıca, kullanıcıların ziyaret ettiği sayfalar yerel depolama'da saklanarak, son ziyaret edilen sayfalar listesi sunulur.

## Proje İçeriği

Proje, aşağıdaki teknolojileri kullanarak geliştirilmiştir:
- **Next.js**: React tabanlı bir framework.
- **React Beautiful DnD**: Sürükle-bırak işlevselliği için kullanılan bir kütüphane.
- **Tailwind CSS**: Stil ve düzenlemeler için kullanılan bir CSS framework'ü.
- **MongoDB**: Veritabanı olarak kullanılan NoSQL veritabanı.

## Anladıklarım
- **Board Oluşturma**: Kullanıcılar, ana sayfada bir tane board oluşturabilir istediği adı girerek. Default olarak da kullanıcıya örnek board verilir.
- **Görev Yönetimi**: Kullanıcılar, görevler oluşturabilir, bu görevleri farklı sütunlar arasında taşıyabilir ve güncelleyebilir.
- **Ziyaret Edilen Sayfalar**: Kullanıcıların ziyaret ettiği sayfalar localStorage'da saklanır ve ekranın sağ alt köşesinde gösterilir.
- **API Entegrasyonu**: Görevlerin ve sütunların yönetimi için API'ler oluşturulmuştur.
- **Özelleştirilmiş Tailwind CSS**: Tailwind CSS'in özelleştirilmesi için yapılandırma dosyaları eklenmiştir.

## İzlenen Adımlar

### 1. Proje Yapısının Oluşturulması

Projeyi başlatmak için Next.js, React Beautiful DnD ve Tailwind CSS kullanarak temel yapı oluşturuldu.

### 2. MongoDB Entegrasyonu

- MongoDB bağlantı ayarları yapıldı ve bağlantı stringi `.env` dosyasına eklendi.
- Görevlerin ve sütunların saklanması için Mongoose modeli oluşturuldu.

### 3. API Geliştirme

- Görev ve sütunları oluşturma, getirme ve güncelleme işlevleri için API endpoint'leri oluşturuldu..

### 4. Kullanıcı Arayüzü ve Fonksiyonellik

- Kullanıcıların görevleri sürükle-bırak yöntemiyle taşıyabileceği bir kullanıcı arayüzü geliştirildi.
- Tailwind CSS kullanılarak stil düzenlemeleri yapıldı.
- Görev ekleme ve düzenleme işlevleri için formlar oluşturuldu.

### 5. Ziyaret Edilen Sayfaların Takibi

- Kullanıcıların ziyaret ettiği sayfaları `localStorage`'da saklayan ve bunları listeleyen bir fonksiyon geliştirildi.Max 5 tane görünür şeklinde yapıldı.5 taneden sonra o 5 tane ziyeret ettiği sayfalardan en şlk ziyaret ettiğini siliyorum.
- Bu işlevsellik için `ClientWrapper` bileşeni ve `localStorage` yardımcı fonksiyonları oluşturuldu.

### 6. Bildirim Sistemi

- `react-toastify` kütüphanesi kullanılarak kullanıcı işlemleri için bildirim sistemi entegre edildi.
- Başarılı ve başarısız işlemler için toast bildirimleri gösterildi.

### 7. Responsive Tasarım

- Kullanıcı arayüzünün responsive olması sağlandı ve yatay kaydırma işlevi eklendi.

### 8. README ve Proje Dokümantasyonu

- Projeyi kolayca çalıştırmak için gerekli adımları içeren bir README dosyası oluşturuldu.
- Projenin amacı, detayları ve izlenen adımları içeren bir doküman (PROJECT_OVERVIEW.md) yazıldı.
- Kanban-Board.postman_collection.json altında postman collection paylaşıldı.

