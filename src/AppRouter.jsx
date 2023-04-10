import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ActiveNotes } from './pages/ActiveNotes'
import { ArchivedNotes } from './pages/ArchivedNotes'
import { Home } from './pages/Home'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="notes"/>} />
                <Route path="/notes"  element={<Home/>} > 
                    <Route path="" element={<Navigate to="active"/>} />
                    <Route path='active'  element={<ActiveNotes/>} />   
                    <Route path="archived" element={<ArchivedNotes/>}  />   
                </Route>
                <Route path="*" element={<div>404</div>} />
                
            </Routes>
        </BrowserRouter>
    )
}
