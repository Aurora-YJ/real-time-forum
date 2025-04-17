package main

import (
	"fmt"
	"net/http"
	"forum/cmd/routes"
)

func main() {
	
	routes.Handle_routers()
	fmt.Println("your serve on : http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

/*

forum/
│
├── main.go                    ← نقطة البداية لتشغيل السيرفر
├── go.mod                     ← لإدارة التبعيات
│
├── controllers/               ← للتحكم في الطلبات (Controllers)
│   ├── auth.go                ← تسجيل الدخول/الخروج والتسجيل
│   └── post.go                ← عرض وإنشاء وتعديل المشاركات
│
├── models/                    ← للتعامل مع قاعدة البيانات (Models)
│   ├── user.go                ← هيكل المستخدم والدوال المرتبطة به
│   └── post.go                ← هيكل المشاركة والدوال المرتبطة بها
│
├── views/                     ← لملفات HTML (Templates)
│   ├── layout.html            ← القالب الرئيسي
│   ├── home.html              ← الصفحة الرئيسية
│   ├── login.html             ← صفحة تسجيل الدخول
│   └── post.html              ← صفحة عرض المنشورات
│
├── static/                    ← ملفات CSS/JS/Images
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── routes/                    ← لتنظيم المسارات (Routes)
│   └── routes.go              ← تعريف كل المسارات
│
├── database/                  ← اتصال وإعداد قاعدة البيانات
│   └── db.go
│
└── utils/                     ← دوال مساعدة مثل التحقق من الجلسة
    └── session.go

*/