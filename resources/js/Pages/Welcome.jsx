import {Link, Head} from '@inertiajs/react';
import TelEmail from "@/Components/TelEmail.jsx";
import SelectMenu from "@/Components/SelectMenu.jsx";
import LogoSearchBasket from "@/Components/LogoSearchBasket.jsx";
import NavbarMy from "@/Components/NavbarMy.jsx";

export default function Welcome({auth, children, children2, ch2, ch3}) {
    return (
        <>
            <Head title="Üdvözlünk"/>
            <div className="w-full md:w-4/5 lg:w-5/6 mx-auto">
                <div className="flex justify-between notflex938">
                    <TelEmail/>
                    <div className="flex items-center justify-center notflex427">
                        <SelectMenu/>
                        <div className="flex justify-center my-2 text-gray-500">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="font-semibold no-underline text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    <div className="border rounded-md flex items-center justify-center"
                                         style={{width: '200px', height: '28px'}}>{auth.user.name}</div>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold no-underline text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Bejelentkezés
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="ml-2 font-semibold no-underline text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Regisztráció
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-full" style={{margin: 0, padding: 0}}/>
            <LogoSearchBasket auth={auth}/>
            <div>{children2}</div>
            <NavbarMy/>
            <div>{children}</div>
            <div>{ch2}</div>
            <div>{ch3}</div>
        </>
    );
}
