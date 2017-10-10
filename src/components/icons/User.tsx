import React, { SFC } from 'react';

interface Props {
    color: string;
}

const User: SFC<Props> = ({ color }) => {
    return (
        <svg width="11" height="15" viewBox="0 0 11 15" xmlns="http://www.w3.org/2000/svg" >
            <path fill={color} d="M11 11.823c0 .624-.18 1.16-.537 1.607-.358.447-.79.67-1.293.67H1.83c-.504 0-.935-.223-1.293-.67C.18 12.983 0 12.447 0 11.823c0-.487.024-.947.073-1.38.05-.432.14-.868.27-1.306.133-.438.3-.813.503-1.126.204-.31.473-.566.808-.764.335-.197.72-.296 1.156-.296.75.733 1.647 1.1 2.69 1.1s1.94-.367 2.69-1.1c.435 0 .82.1 1.156.296.335.198.604.453.808.765.203.314.37.69.502 1.127.132.438.222.874.27 1.306.05.433.074.893.074 1.38zM8.8 4.2c0 .91-.322 1.69-.967 2.333C7.19 7.178 6.41 7.5 5.5 7.5c-.91 0-1.69-.322-2.333-.967C2.522 5.89 2.2 5.11 2.2 4.2c0-.91.322-1.69.967-2.333C3.81 1.222 4.59.9 5.5.9c.91 0 1.69.322 2.333.967.645.644.967 1.422.967 2.333z" fillRule="evenodd" />
        </svg>
    );
};

export default User;
