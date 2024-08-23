﻿
namespace MyLink.Data.Repository.IRepository
{
    public interface IUnitOfWork
    {
        public IEducationRepository Education { get; set; }
        public IExperienceRepository Experience { get; set; }
        void Save();
    }
}