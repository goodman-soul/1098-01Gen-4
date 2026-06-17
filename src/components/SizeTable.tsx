import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface SizeTableProps {
  columns: Column[];
  data: Record<string, string | number>[];
  highlightRow?: (row: Record<string, string | number>) => boolean;
  title?: string;
}

export function SizeTable({ columns, data, highlightRow, title }: SizeTableProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (isMobile) {
    return (
      <div className="w-full">
        {title && (
          <h3 className="text-lg font-semibold font-display text-dark-50 mb-4">
            {title}
          </h3>
        )}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {data.map((row, rowIndex) => {
            const isHighlighted = highlightRow?.(row);
            return (
              <motion.div
                key={rowIndex}
                variants={rowVariants}
                className={`card p-4 ${
                  isHighlighted
                    ? 'border-accent-500/50 bg-gradient-to-br from-accent-500/10 to-dark-800'
                    : ''
                }`}
              >
                {isHighlighted && (
                  <div className="flex items-center gap-2 mb-3 text-accent-400 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                    推荐尺码
                  </div>
                )}
                <div className="space-y-2">
                  {columns.map((col, colIndex) => (
                    <div
                      key={col.key}
                      className={`flex justify-between items-center ${
                        colIndex < columns.length - 1
                          ? 'border-b border-dark-600/50 pb-2'
                          : ''
                      }`}
                    >
                      <span className="text-dark-400 text-sm">{col.header}</span>
                      <span
                        className={`font-medium ${
                          colIndex === 0 ? 'text-lg font-display text-primary-300' : 'text-dark-100'
                        }`}
                      >
                        {row[col.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold font-display text-dark-50 mb-4">
          {title}
        </h3>
      )}
      <div className="relative">
        <div className="table-scroll-container">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-dark-700/80 sticky top-0 backdrop-blur-sm">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-sm font-semibold text-dark-100 font-display"
                    style={{ width: col.width }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {data.map((row, rowIndex) => {
                const isHighlighted = highlightRow?.(row);
                return (
                  <motion.tr
                    key={rowIndex}
                    variants={rowVariants}
                    className={`border-b border-dark-700 transition-colors ${
                      rowIndex % 2 === 0 ? 'bg-dark-800/30' : 'bg-dark-800/50'
                    } ${
                      isHighlighted
                        ? 'bg-accent-500/10 hover:bg-accent-500/20'
                        : 'hover:bg-dark-700/30'
                    }`}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 ${
                          colIndex === 0
                            ? 'font-display font-semibold text-primary-300'
                            : 'text-dark-100'
                        } ${isHighlighted ? 'text-accent-300' : ''}`}
                      >
                        {isHighlighted && colIndex === 0 && (
                          <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mr-2 animate-pulse" />
                        )}
                        {row[col.key]}
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
