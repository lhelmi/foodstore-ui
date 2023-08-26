import * as React from 'react'; 
import {
    SideNav,
    LayoutSidebar,
    Responsive,
    Pagination,
    CardProduct,
    InputText
} from 'upkit';
import BounceLoader from 'react-spinners/BounceLoader';
import { useDispatch, useSelector } from 'react-redux';
import menus from './menus';
import TopBar from '../../components/topBar/index'
import { config } from '../../config';
import {
    fetchProducts,
    setPage,
    goToNextPage,
    goToPrevPage,
    setKeyword
} from '../../features/products/actions';


export default function Home(){
    let dispatch = useDispatch();
    let products = useSelector(state => state.products);

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, products.currentPage, products.keyword]);
    return (
        <div>
            <LayoutSidebar
                sidebar={<SideNav items={menus} verticalAlign="top"/>}
                content={
                    <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
                        <div className="w-full md:w-3/4 pl-5 pb-10">
                            <TopBar/>
                            <div className="w-full text-center mb-10 mt-5">
                                <InputText
                                    fullRound
                                    value = {products.keyword}
                                    placeholder = "cari makanan favoritmu..."
                                    fitContainer
                                    onChange = {e => {
                                        dispatch(setKeyword(e.target.value))
                                    }}
                                />
                            </div>
                            {
                                products.status === 'process' && !products.data.length ?
                                <div className='flex justify-center'>
                                    <BounceLoader color='red' />
                                </div>
                                : null
                            }
                            <Responsive desktop={3} items="stretch">
                                {products.data.map((product, index) => {
                                    return <div key={index} className="p-2">
                                        <CardProduct
                                            title={product.name}
                                            imgUrl= {`${config.api_host}/upload/${product.image_url}`}
                                            price={product.price}
                                            onAddToCart={_ => null}
                                        />
                                    </div>
                                })}
                            </Responsive>
                            <div className='text-center my-10'>
                                <Pagination
                                    totalItems = {products.totalItems}
                                    page = {products.page}
                                    perPage = {products.perPage}
                                    onChange = {page => dispatch(setPage(page))}
                                    onNext = {_ => dispatch(goToNextPage())}
                                    onPrev = {_ => dispatch(goToPrevPage())}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
                            Keranjang belanja di sini
                        </div>
                    </div>
                }
                sidebarSize={80}
            />
        </div>
    )
}