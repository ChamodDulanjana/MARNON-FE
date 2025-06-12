import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, Pagination, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {useEffect, useState} from "react";
import {PaginationDTO} from "@/models/paginationDTO.ts";
import {getPopularProductsForAdmin} from "@/services/productService.ts";
import LoadingAnimation from "@/components/loading-animation/page.tsx";
import NotFound from "@/pages/notFound.tsx";

type ColumnType = {
    name: string;
    uid: string;
};

type PopularItemType = {
    id: number;
    itemCode: string;
    name: string;
    category: string;
    sales: string;
}

const tableColumns: ColumnType[] = [
    { name: "ITEM CODE", uid: "item_code" },
    { name: "NAME", uid: "name" },
    { name: "CATEGORY", uid: "category" },
    { name: "SALES", uid: "sales" }
];

const TablePopularProducts = () => {
    const [products, setProducts] = useState<PopularItemType[]>([{
        id: 0,
        itemCode: "",
        name: "",
        category: "",
        sales: "",
    }])
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const rowsPerPage = 5;


    // Get popular products from the server
    useEffect(() => {
        // Build pagination dto
        const paginationDto: PaginationDTO = {
            page: page,
            limit: rowsPerPage,
        };

        // Fetch popular products from the server
        const fetchPopularProducts = async () => {
            const response = await getPopularProductsForAdmin(paginationDto);
            if (response.statusCode === 200) {
                const { productList, totalRows } = response.data;
                setProducts(productList);
                setPages(Math.ceil(totalRows / rowsPerPage));
                setIsLoading(false);
            } else {
                setIsError(true);
            }
        }

        fetchPopularProducts();
    }, [page]);

    if (isLoading) return <LoadingAnimation />;
    if (isError)   return <NotFound />;

    return (
        <div className="w-full">
            <Card className="flex flex-col">
                <CardHeader className="">
                    <CardTitle>Popular products</CardTitle>
                    <CardDescription>Showing the latest popular products</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <Table
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={setPage}
                                />
                            </div>
                        }
                    >
                        <TableHeader columns={tableColumns}>
                            {(column) => (
                                <TableColumn
                                    key={column.uid}
                                    align={"start"}
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={products}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => (
                                        <TableCell key={columnKey}>
                                            {columnKey === "item_code" && item.itemCode}
                                            {columnKey === "name" && item.name}
                                            {columnKey === "category" && item.category}
                                            {columnKey === "sales" && item.sales}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default TablePopularProducts;