1. Setiap ada code yang di push ke github, cukup jalankan sekali di awal
docker compose up -d 
Watchtower akan berjalan setiap 30 detik untuk mengecek perubahan.
2. Untuk menghentikan container yang berjalan, jalankan
docker compose stop
3. Jika ingin menjalankan kembali di kemudian hari, cukup jalankan
docker compose start

Frontend : localhost:3000
Backend : localhost:5000
Database : localhost:3307

How to run sql :
1. docker exec -it todo-app-db mysql -u root -p
2. Masukkan password (1234)
3. SHOW DATABASES;
4. USE todo_db;
5. SHOW TABLES;
6. SELECT * FROM tasks;

Using Kubernetes:
Make sure every pod is running
kubectl get pods -n uas-devops

1. FE : kubectl port-forward svc/fe-service 5500:80 -n uas-devops
2. BE : kubectl port-forward svc/be-service 5000:5000 -n uas-devops
3. Check data in mysql : kubectl exec -it [pod-name] -n uas-devops -- mysql -u root -p
