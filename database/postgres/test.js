// query for items by sellerId


SELECT *
FROM additionalitems
WHERE
sellerId IN (
	SELECT
		sellerId
	FROM
		additionalitems
	WHERE
		itemId = <query for itemId>
)