"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const react_1 = __importDefault(require("react"));
const Pagination = ({ currentPage, totalPages, onPageChange, isDark = false }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++)
                    pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
            else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++)
                    pages.push(i);
            }
            else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++)
                    pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };
    if (totalPages <= 1)
        return null;
    return (<div className="flex items-center justify-center space-x-2 mt-8">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
            ? isDark ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isDark ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
        Previous
      </button>
      
      {getPageNumbers().map((page, index) => (<button key={index} onClick={() => typeof page === 'number' && onPageChange(page)} disabled={page === '...'} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : page === '...'
                    ? isDark ? 'text-slate-500 cursor-default' : 'text-gray-400 cursor-default'
                    : isDark ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
          {page}
        </button>))}
      
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
            ? isDark ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isDark ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
        Next
      </button>
    </div>);
};
exports.Pagination = Pagination;
