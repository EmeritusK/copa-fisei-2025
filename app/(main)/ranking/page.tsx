'use client';

import { TablePosicion } from './components/position_table'

function Page() {

    return (
        
            <div className='my-12'>
                <h1 className="text-4xl font-roboto font-bold text-center text-foreground mt-10">CLASIFICACION</h1>

                <TablePosicion ></TablePosicion>
                
            </div>

    );
}

export default Page;
