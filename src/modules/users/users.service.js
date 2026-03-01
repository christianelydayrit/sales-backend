export async function fetchUserSales(pg, id){
    const data = await pg.query(
        `
        SELECT
        p.name AS product,
        s.quantity,
        s.total_amount,
        TO_CHAR(s.sale_date, 'MM-DD-YYYY') AS sale_date
        FROM sales s
        JOIN customers c ON c.id = s.customer_id
        JOIN products p ON p.id = s.product_id
        WHERE c.id = $1
        ORDER by s.sale_date DESC
        `
        ,[id]
    )

    return data.rows;
}