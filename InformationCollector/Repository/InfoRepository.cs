using Dapper;
using InformationCollector.Context;
using InformationCollector.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Data;

namespace InformationCollector.Repository
{
    public class InfoRepository : IInfoRepository
    {
        private readonly DapperContext _context;
        public InfoRepository(DapperContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateInfoAsync(CreateInfoDTO model)
        {
            try
            {
                int infoId = 0;
                bool isSuccess = false;
                var query = "INSERT INTO Informations (Name, CountryId, CityId, DateOfBirth, FileBase64, FileTypes, FileNames) VALUES (@Name, @CountryId, @CityId, @DateOfBirth, @FileBase64, @FileTypes, @FileNames)" +
                            "SELECT CAST(SCOPE_IDENTITY() as int)";
                var parameters = new DynamicParameters();
                parameters.Add("Name", model.Name, DbType.String);
                parameters.Add("CountryId", model.CountryId, DbType.String);
                parameters.Add("CityId", model.CityId, DbType.String);
                parameters.Add("DateOfBirth", model.DateOfBirth, DbType.String);
                if(model.Document != null)
                {
                    parameters.Add("FileNames", model.Document.FileNames, DbType.String);
                    parameters.Add("FileTypes", model.Document.FileTypes, DbType.String);
                    parameters.Add("FileBase64", model.Document.FileBase64, DbType.Binary);
                }
                

                using (var connection = _context.CreateConnection())
                {
                    infoId = await connection.QuerySingleAsync<int>(query, parameters);
                    if(infoId != 0)
                    {
                        var queryL = "INSERT INTO LanguageData (InfoId, LanguageId, LanguageName) VALUES (@InfoId, @LanguageId, @LanguageName)";
                        foreach (var item in model.LanguageList)
                        {
                            var languageData = new DynamicParameters();
                            languageData.Add("InfoId", infoId, DbType.Int32);
                            languageData.Add("LanguageId", item.Id, DbType.Int32);
                            languageData.Add("LanguageName", item.LanguageName, DbType.String);
                            var lanData = await connection.ExecuteAsync(queryL, languageData);
                        }
                        isSuccess= true;
                    }
                }
                return isSuccess;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<InformationDTO>> GetAllInformation()
        {
            try
            {
                var query = "Select I.Id,I.Name,I.FileNames,I.FileBase64,I.FileTypes,I.DateOfBirth,CO.CountryName,C.CityName " +
                    "from Informations as I Left Join Cities as C on I.CityId = C.Id Left Join Countrys as CO on I.CountryId = CO.Id";
                using (var connection = _context.CreateConnection())
                {
                    var informations = await connection.QueryAsync<InformationDTO>(query);
                    return informations.ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
