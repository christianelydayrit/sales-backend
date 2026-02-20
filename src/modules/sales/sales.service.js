function monthRange(month, year){ 
        const start = `${year}-${String(month).padStart(2, '0')}-01`;

        const nextMonth = month === 12? 1: month + 1;
        const nextYear = month === 12? year + 1: year;

        const end = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

        return { start, end };
    }

export default async function fetchMonthlySales(pg, month, year){

    const { start, end } = monthRange(month, year);

    const { rows } = await pg.query(
        `SELECT
        s.id,
        c.first_name || ' ' || c.last_name AS customer_name,
        p.name AS product_name,
        s.quantity,
        s.total_amount,
        TO_CHAR(s.sale_date, 'MM-DD-YYYY') AS sale_date
        FROM sales s
        JOIN customers c ON c.id = s.customer_id
        JOIN products p ON p.id = s.product_id
        WHERE s.sale_date >= $1 
            AND s.sale_date < $2
            ORDER BY s.sale_date DESC, s.id DESC;
        `, [start, end]
    );
    return rows;

}

    