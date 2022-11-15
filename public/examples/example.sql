SELECT FROM users.uid, orders.total, users.created_at
FROM (
    SELECT * FROM users
    LEFT JOIN (
        SELECT user_id, COUNT(*) AS total
        FROM orders
        GROUP BY user_id
    ) AS orders ON orders.user_id = users.uid
    WHERE users.created_at > '2018-01-01' and orders.total > 10
)
ORDER BY users.created_at DESC
