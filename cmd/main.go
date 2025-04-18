package main

import (
	"fmt"
	"forum/cmd/routes"
	"forum/database"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	db, err := database.Init()
	if err != nil {
		log.Fatal(err)
	}

	sig := 	make(chan os.Signal, 1)
	signal.Notify(sig , os.Interrupt, syscall.SIGALRM)

	routes.Handle_routers(db)

	fmt.Println("your serve on : http://localhost:8080")

	go func() {
		if err := http.ListenAndServe(":8080", nil) ; err != nil {
			log.Fatal("server error:", err)
		}
	}()

	<-sig

	err = db.Close()
	if err != nil {
		log.Println("\nerror to close database", err)
	} else {
		fmt.Println("\ndatabase is closed (:")
	}
	
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
