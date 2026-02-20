function monthRange(month, year){ 
        const startDate = `${year}-${ String(month).padStart(2, '0') }-01`;

        const nextMonth = month === 12? 1: month + 1;
        const nextYear = month === 12? year + 1: year;

        const endDate = `${ nextYear }-${ String(nextMonth).padStart(2, '0') }-01`;

        return { startDate, endDate };
    }

export default async function fetchMonthlySales(pg, month, year, page, pageSize){

    const { startDate, endDate } = monthRange(month, year);

    const offset = (page - 1) * pageSize;

    const { rows: rowCount } = await pg.query(
        `SELECT COUNT(*)::int as total
         FROM sales s
         WHERE s.sale_date >= $1 
            AND s.sale_date < $2   
        `, [startDate, endDate]
    );

    const total = rowCount[0]?.total ?? 0;

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
        ORDER BY s.sale_date DESC, s.id DESC
        LIMIT $3 OFFSET $4;
        `, [startDate, endDate, pageSize, offset]
    );

    const totalPages = Math.ceil(total / pageSize);

    return {
        data: rows,
        meta: {
            page,
            pageSize,
            total,
            totalPages
        }
    };
}

    