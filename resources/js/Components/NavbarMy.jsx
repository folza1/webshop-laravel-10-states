import {Head} from '@inertiajs/react';
import {useState} from "react";
import NavLink from "@/Components/NavLink.jsx";

export default function NavbarMy() {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <div className="w-full md:w-4/5 lg:w-5/6 mx-auto">
                <div>
                    <div className="flex w-full bg-blue-500">
                        <div
                            className="bg-blue-500 px-4 py-1 border-r border-gray-300 text-white transition-colors duration-500 hover:bg-white hoverBlue"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleMouseLeave}
                        >Elektronikai Cikkek
                        </div>
                    </div>
                </div>
                {isHovered && (
                    <div className="flex absolute z-1 w-full md:w-4/5 lg:w-5/6 bg-white py-2 borderBlue"
                         onMouseEnter={handleHover}
                         onMouseLeave={handleMouseLeave}
                    >
                        <NavLink href={route('smartphones')}>
                            <div className="flex mr-4 p-2 border-y items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                     className="bi bi-phone" viewBox="0 0 16 16">
                                    <path
                                        d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                                <div className="ml-4">Okostelefonok</div>
                            </div>
                        </NavLink>
                        <NavLink href={route('laptops')}>
                            <div className="flex mx-4 p-2 border-y items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                     className="bi bi-laptop" viewBox="0 0 16 16">
                                    <path
                                        d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>
                                </svg>
                                <div className="ml-4">Laptopok</div>
                            </div>
                        </NavLink>
                    </div>
                )}
            </div>
        </>
    );
}
